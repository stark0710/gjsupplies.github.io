import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const services = [
  {
    icon: Package,
    title: "Bulk Supply Services",
    description:
      "We specialize in large-volume orders for businesses and institutions. Get competitive pricing on bulk purchases with flexible delivery schedules.",
    features: [
      "Volume-based pricing discounts",
      "Scheduled deliveries",
      "Inventory management support",
      "Priority order processing",
    ],
  },
  {
    icon: FileText,
    title: "Custom Orders",
    description:
      "Can't find exactly what you need? We source specialized products and custom specifications from our network of manufacturers.",
    features: [
      "Specialized product sourcing",
      "Custom specifications",
      "OEM parts procurement",
      "Product alternatives research",
    ],
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description:
      "Reliable logistics network ensuring timely delivery to any location across India. Track your orders in real-time.",
    features: [
      "Delivery to all states",
      "Express shipping options",
      "Real-time tracking",
      "Secure packaging",
    ],
  },
  {
    icon: Users,
    title: "Institutional Accounts",
    description:
      "Dedicated account management for hospitals, factories, offices, and large organizations with regular supply needs.",
    features: [
      "Dedicated account manager",
      "Credit terms available",
      "Consolidated invoicing",
      "Priority support",
    ],
  },
];

const processSteps = [
  {
    step: "01",
    title: "Submit Requirements",
    description: "Share your product requirements via our contact form or WhatsApp",
  },
  {
    step: "02",
    title: "Receive Quote",
    description: "Get a detailed quotation within 24 hours",
  },
  {
    step: "03",
    title: "Confirm Order",
    description: "Approve the quote and confirm your order",
  },
  {
    step: "04",
    title: "Get Delivery",
    description: "Receive your products at your doorstep",
  },
];

const Services = () => {
  const { toast } = useToast();

  const handleQuoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you with a quote within 24 hours.",
    });
  };

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello! I'd like to request a quote for bulk order. Please assist."
  )}`;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Comprehensive supply solutions tailored for businesses of all sizes. 
              From bulk orders to custom sourcing, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, straightforward process to get your supplies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Quote Form */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Request a Quote
              </h2>
              <p className="text-lg text-muted-foreground">
                Tell us about your requirements and we'll get back to you with a customized quote
              </p>
            </div>
            <Card className="p-6 md:p-8">
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your company name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Person</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Product Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Describe the products you need, quantities, specifications, etc."
                    rows={5}
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="flex-1">
                    Submit Quote Request
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    asChild
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp Instead
                    </a>
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Browse our product catalog and place your order today, or get in touch for a custom quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
              asChild
            >
              <Link to="/products">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold"
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
