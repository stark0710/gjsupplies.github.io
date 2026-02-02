-- Create app_role enum for admin roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Categories are publicly readable
CREATE POLICY "Categories are publicly readable"
ON public.categories
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can manage categories
CREATE POLICY "Admins can manage categories"
ON public.categories
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url TEXT,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Products are publicly readable"
ON public.products
FOR SELECT
TO anon, authenticated
USING (true);

-- Only admins can manage products
CREATE POLICY "Admins can manage products"
ON public.products
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create order_status enum
CREATE TYPE public.order_status AS ENUM ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled');

-- Create orders table
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address JSONB NOT NULL,
    items JSONB NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    status order_status NOT NULL DEFAULT 'pending',
    stripe_payment_intent_id TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Customers can view their own orders by email (using email from JWT if authenticated)
CREATE POLICY "Customers can insert orders"
ON public.orders
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins can manage all orders
CREATE POLICY "Admins can manage orders"
ON public.orders
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_in_stock ON public.products(in_stock);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- Insert default categories
INSERT INTO public.categories (name, slug, description, image_url) VALUES
('Tools & Equipment', 'tools', 'Professional-grade tools for every industrial need', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop'),
('Electrical Supplies', 'electrical', 'Quality electrical components and accessories', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'),
('Mechanical Parts', 'mechanical', 'Precision mechanical components and parts', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop'),
('Safety Items', 'safety', 'Comprehensive safety gear and equipment', 'https://images.unsplash.com/photo-1618090584126-129cd1b09f6c?w=400&h=300&fit=crop'),
('Consumables', 'consumables', 'Industrial consumables and supplies', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop');

-- Insert sample products
INSERT INTO public.products (name, slug, description, price, category_id, image_url, in_stock, featured) VALUES
('Heavy Duty Power Drill', 'heavy-duty-power-drill', 'Professional-grade power drill with variable speed control and hammer function. Perfect for construction and industrial applications.', 4999, (SELECT id FROM public.categories WHERE slug = 'tools'), 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop', true, true),
('Industrial Safety Helmet', 'industrial-safety-helmet', 'High-impact resistant safety helmet with adjustable suspension and ventilation. Meets IS 2925 standards.', 599, (SELECT id FROM public.categories WHERE slug = 'safety'), 'https://images.unsplash.com/photo-1618090584126-129cd1b09f6c?w=400&h=400&fit=crop', true, true),
('Electrical Wire Bundle 100m', 'electrical-wire-bundle-100m', 'Premium quality copper electrical wire bundle. Flame retardant PVC insulation, suitable for domestic and industrial wiring.', 2499, (SELECT id FROM public.categories WHERE slug = 'electrical'), 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', true, false),
('Precision Bearing Set', 'precision-bearing-set', 'High-quality precision bearing set for industrial machinery. Includes various sizes for common applications.', 1299, (SELECT id FROM public.categories WHERE slug = 'mechanical'), 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop', true, false),
('Industrial Cleaning Kit', 'industrial-cleaning-kit', 'Complete industrial cleaning kit with heavy-duty degreasers, brushes, and protective equipment.', 899, (SELECT id FROM public.categories WHERE slug = 'consumables'), 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop', true, false),
('Professional Tool Set 120pc', 'professional-tool-set-120pc', 'Comprehensive 120-piece professional tool set in a sturdy carrying case. Includes wrenches, screwdrivers, pliers, and more.', 8999, (SELECT id FROM public.categories WHERE slug = 'tools'), 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop', true, true),
('Circuit Breaker 32A', 'circuit-breaker-32a', 'High-quality MCB circuit breaker for electrical panel installations. Provides overload and short circuit protection.', 349, (SELECT id FROM public.categories WHERE slug = 'electrical'), 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop', true, false),
('Safety Gloves (Pack of 12)', 'safety-gloves-pack-12', 'Heavy-duty work gloves with cut-resistant coating. Ideal for handling sharp materials and general industrial work.', 799, (SELECT id FROM public.categories WHERE slug = 'safety'), 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop', true, false);
