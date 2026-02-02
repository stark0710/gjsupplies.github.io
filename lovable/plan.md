

# GJ Supplies - Industrial & General Supplies Website

A professional e-commerce website for GJ Supplies with online ordering, WhatsApp bulk enquiry support, and an admin panel for product management.

---

## 🎨 Design Theme
- **Color Palette**: Dark navy blue header, white backgrounds, grey accents (matching reference site)
- **Style**: Clean, professional, industrial aesthetic
- **Typography**: Modern, readable fonts (similar to the reference)
- **Icons**: Lucide React icons for a polished, consistent look
- **Mobile-responsive**: Fully responsive across all devices

---

## 📄 Public Pages

### 1. Home Page
- **Hero Section**: Large tagline "Quality you can trust. Supplies you can rely on." with product image collage and dual CTA buttons (Shop Now + WhatsApp Enquiry)
- **Company Introduction**: Brief description of industrial & general supply services
- **Product Categories Showcase**: 5 category cards (Tools, Electrical, Mechanical, Safety Items, Consumables) with images and "View Products" buttons
- **Scrolling Trust Banner**: "Quality Certified • Industrial Grade • Pan-India Logistics • Premium Supplies"
- **Why Choose Us Section**: Key differentiators with icons (Reliable Quality, Bulk Supply Support, Fast Response, Direct Communication)
- **Sectors We Serve**: Grid showing Hospitals, Offices, Manufacturing, Warehouses, etc.
- **Contact CTA Section**: "Need reliable supplies?" with WhatsApp button and order CTA

### 2. About Us Page
- Company history and mission
- Our values (Quality, Reliability, Customer Service)
- Why institutions choose GJ Supplies
- Team or company overview

### 3. Products Page
- Category filter sidebar/tabs
- Product grid with image, name, price, and "Add to Cart" button
- Quick view functionality
- Search functionality
- Sort by price/name options

### 4. Services Page
- Bulk supply services
- Custom orders
- Delivery options (Pan-India reach)
- Account management for institutions
- Request for Quote form

### 5. Contact Us Page
- Contact form (Name, Email, Phone, Message)
- WhatsApp direct link button
- Business address and phone
- Operating hours
- Embedded map (optional)

---

## 🛒 E-commerce Features

### Shopping Experience
- **Product Catalog**: Browseable products with images, descriptions, prices
- **Shopping Cart**: Add/remove items, quantity adjustment, cart summary
- **Checkout Flow**: Customer details form → Stripe payment integration
- **Order Confirmation**: Success page with order details

### WhatsApp Integration
- Floating WhatsApp button on all pages
- Click-to-chat with pre-filled message for bulk enquiries
- Direct enquiry option from product pages

---

## 👨‍💼 Admin Panel

### Dashboard
- Quick stats (total products, recent orders)
- Navigation to management sections

### Product Management
- Add new products (name, description, price, category, images)
- Edit existing products
- Delete products
- Manage categories
- Upload product images

### Orders View
- List of customer orders
- Order details and status

---

## 🔧 Technical Implementation

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Responsive design for all screen sizes

### Backend (Lovable Cloud)
- **Supabase Database**: Products table, Categories table, Orders table
- **Supabase Auth**: Admin login for the management panel
- **Supabase Storage**: Product image uploads
- **Stripe Integration**: Secure online payments

### Security
- Protected admin routes
- Secure payment processing via Stripe
- Input validation on all forms

---

## 📱 Key User Flows

1. **Customer Shopping**: Browse → Add to Cart → Checkout → Pay → Order Confirmation
2. **Bulk Enquiry**: Click WhatsApp → Pre-filled message → Direct communication
3. **Admin Product Update**: Login → Dashboard → Add/Edit Product → Save

