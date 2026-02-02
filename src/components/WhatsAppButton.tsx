import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "919876543210"; // Replace with actual WhatsApp number
  const message = encodeURIComponent(
    "Hello! I'm interested in your industrial supplies. Could you please provide more information?"
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card text-card-foreground px-3 py-2 rounded-lg shadow-md text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
