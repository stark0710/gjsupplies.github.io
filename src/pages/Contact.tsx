import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 98765 43210", "+91 22 1234 5678"],
    action: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@gjsupplies.com", "orders@gjsupplies.com"],
    action: "mailto:info@gjsupplies.com",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Industrial Area, Sector 5", "Mumbai, Maharashtra 400001"],
    action: "https://maps.google.com/?q=Mumbai+Industrial+Area",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed"],
  },
];

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    "Hello! I'd like to inquire about your products and services."
  )}`;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Have questions or need a quote? Get in touch with our team. 
              We're here to help with all your industrial supply needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                Send Us a Message
              </h2>
              <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your requirements..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-whatsapp/10 rounded-lg border border-whatsapp/20">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-whatsapp flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-whatsapp-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1">
                      Prefer WhatsApp?
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Get instant responses for bulk enquiries and quick orders.
                    </p>
                    <Button className="bg-whatsapp hover:bg-whatsapp/90" asChild>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                Get In Touch
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {contactInfo.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm">
                              {item.action ? (
                                <a
                                  href={item.action}
                                  className="hover:text-primary transition-colors"
                                  target={item.action.startsWith("http") ? "_blank" : undefined}
                                  rel={item.action.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                  {detail}
                                </a>
                              ) : (
                                detail
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14571494886!2d72.71637349675942!3d19.082502000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1637835436186!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="GJ Supplies Location"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4">
            {[
              {
                q: "What is the minimum order quantity?",
                a: "We cater to orders of all sizes. However, for bulk pricing benefits, we recommend minimum orders based on product category. Contact us for specific details.",
              },
              {
                q: "Do you offer delivery across India?",
                a: "Yes, we deliver to all major cities and towns across India. Delivery times vary based on location and order size.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept online payments via credit/debit cards, UPI, net banking, and also offer credit terms for institutional accounts.",
              },
              {
                q: "Can you source products not listed on your website?",
                a: "Absolutely! We have a wide network of suppliers. Send us your requirements and we'll source the products for you.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-5">
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
