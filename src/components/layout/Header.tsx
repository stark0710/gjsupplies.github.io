import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/products", label: "Products" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      {/* Top Bar */}
      <div className="hidden md:block bg-primary/90 border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-primary-foreground/80 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 98765 43210</span>
            </div>
            <span>Quality Industrial & General Supplies</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary-foreground text-primary font-heading font-bold text-xl md:text-2xl px-3 py-1 rounded">
              GJ
            </div>
            <span className="text-primary-foreground font-heading font-bold text-lg md:text-xl">
              Supplies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-primary-foreground/90 hover:text-primary-foreground font-medium transition-colors relative py-2 ${
                  isActive(link.path)
                    ? "text-primary-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-foreground"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-warning text-warning-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            <Link to="/products" className="hidden md:block">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
                Shop Now
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-primary-foreground/10">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-md text-primary-foreground/90 hover:bg-primary-foreground/10 font-medium transition-colors ${
                    isActive(link.path) ? "bg-primary-foreground/10 text-primary-foreground" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/products"
                className="mx-4 mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold">
                  Shop Now
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
