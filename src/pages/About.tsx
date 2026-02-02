import { Target, Heart, Award, Users, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: Award,
    title: "Quality First",
    description:
      "We never compromise on quality. Every product we supply meets rigorous industry standards and certifications.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We build lasting relationships through exceptional service and support.",
  },
  {
    icon: Target,
    title: "Reliability",
    description:
      "Consistent delivery, accurate orders, and dependable supply chain management you can count on.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "We work as an extension of your team, understanding your needs and growing together.",
  },
];

const milestones = [
  { number: "10+", label: "Years of Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "5000+", label: "Products Delivered" },
  { number: "15+", label: "Cities Served" },
];

const whyChoose = [
  "Wide range of industrial and general supplies",
  "Competitive pricing with bulk discounts",
  "Fast and reliable pan-India delivery",
  "Quality certified products only",
  "Expert technical support team",
  "Flexible payment options",
  "Dedicated account managers for institutions",
  "Easy ordering via WhatsApp",
];

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              About GJ Supplies
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Your trusted partner in industrial and general supplies since 2014. 
              We're dedicated to providing quality products that keep your business running smoothly.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  GJ Supplies was founded with a simple mission: to be the most 
                  reliable supplier of industrial and general supplies in India. 
                  What started as a small trading company has grown into a trusted 
                  name serving hundreds of businesses across the country.
                </p>
                <p>
                  Over the years, we've built strong relationships with leading 
                  manufacturers and brands, allowing us to offer our customers 
                  the best products at competitive prices. Our deep understanding 
                  of industrial needs, combined with our commitment to service 
                  excellence, sets us apart.
                </p>
                <p>
                  Today, we serve diverse sectors including manufacturing, healthcare, 
                  construction, and logistics. Our dedicated team works tirelessly 
                  to ensure every order is fulfilled with accuracy and speed.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=500&fit=crop"
                alt="GJ Supplies Team"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <div className="font-heading text-3xl font-bold">10+</div>
                <div className="text-primary-foreground/80">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the preferred supplier for businesses by consistently 
                  delivering quality industrial and general supplies with 
                  exceptional service, competitive pricing, and reliable logistics.
                </p>
              </CardContent>
            </Card>
            <Card className="p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become India's most trusted industrial supplies partner, 
                  known for quality, reliability, and innovation in serving 
                  diverse business needs across all sectors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Milestones
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-4xl md:text-5xl font-bold mb-2">
                  {milestone.number}
                </div>
                <div className="text-primary-foreground/80">{milestone.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                Why Institutions Choose Us
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We understand the unique needs of businesses and institutions. 
                Our tailored solutions, reliable supply chain, and dedicated 
                support make us the preferred choice for industrial supplies.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChoose.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=500&fit=crop"
                alt="Warehouse"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
