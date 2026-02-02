import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Clock, 
  MessageCircle,
  Wrench,
  Zap,
  Settings,
  HardHat,
  Package,
  Building2,
  Factory,
  Hospital,
  Warehouse,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "tools",
    name: "Tools & Equipment",
    description: "Professional-grade tools for every industrial need",
    icon: Wrench,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  },
  {
    id: "electrical",
    name: "Electrical Supplies",
    description: "Quality electrical components and accessories",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: "mechanical",
    name: "Mechanical Parts",
    description: "Precision mechanical components and parts",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
  },
  {
    id: "safety",
    name: "Safety Items",
    description: "Comprehensive safety gear and equipment",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1618090584126-129cd1b09f6c?w=400&h=300&fit=crop",
  },
  {
    id: "consumables",
    name: "Consumables",
    description: "Industrial consumables and supplies",
    icon: Package,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
  },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "Reliable Quality",
    description: "All products meet strict quality standards and industry certifications.",
  },
  {
    icon: Package,
    title: "Bulk Supply Support",
    description: "Specialized in handling large orders with competitive bulk pricing.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "Quick quotations and responsive customer support team.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "Easy WhatsApp ordering for seamless business communication.",
  },
];

const sectors = [
  { icon: Hospital, name: "Healthcare" },
  { icon: Building2, name: "Offices" },
  { icon: Factory, name: "Manufacturing" },
  { icon: Warehouse, name: "Warehouses" },
  { icon: Building, name: "Construction" },
  { icon: Truck, name: "Logistics" },
];

const trustBannerItems = [
  "Quality Certified",
  "Industrial Grade",
  "Pan-India Logistics",
  "Premium Supplies",
  "Bulk Orders Welcome",
  "Expert Support",
];

const Home = () => {
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello! I'm interested in bulk ordering industrial supplies. Please share more details."
  )}`;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Quality you can trust.{" "}
              <span className="text-warning">Supplies you can rely on.</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 leading-relaxed">
              Your trusted partner for industrial and general supplies. 
              From tools to safety equipment, we deliver quality products 
              to businesses across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-lg px-8"
                asChild
              >
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-lg px-8"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Enquiry
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Trust Banner */}
      <section className="bg-secondary py-4 overflow-hidden">
        <div className="flex animate-scroll">
          {[...trustBannerItems, ...trustBannerItems].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-8 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-medium text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Industrial & General Supply Experts
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              GJ Supplies is a leading supplier of industrial and general supplies, 
              serving businesses of all sizes across India. With years of experience, 
              we understand what it takes to keep your operations running smoothly. 
              From essential tools to specialized equipment, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Product Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of industrial supplies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="group overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mb-2">
                      <category.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading font-semibold text-xl text-primary-foreground">
                      {category.name}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/products?category=${category.id}`}>
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Choose GJ Supplies?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering excellence in every aspect
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Sectors We Serve
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Trusted by businesses across various industries
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 p-6 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <sector.icon className="h-10 w-10" />
                <span className="font-medium text-center">{sector.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Need Reliable Supplies?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get in touch with us today for a custom quote. We offer competitive 
              pricing for bulk orders and fast delivery across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
                asChild
              >
                <Link to="/contact">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground font-semibold"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
