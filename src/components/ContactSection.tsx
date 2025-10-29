import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Twitter, Linkedin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const handleBookCall = () => {
    window.open("https://www.instagram.com/almosthuman.in/", "_blank");
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Let's create something almost human.
          </h2>
          <p className="text-xl text-muted-foreground">Your imagination made real.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8" aria-label="Contact form">
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-card/50 border-border focus:border-primary"
              required
              aria-label="Your name"
              name="name"
            />
          </div>

          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-card/50 border-border focus:border-primary"
              required
              aria-label="Your email address"
              name="email"
            />
          </div>

          <div>
            <Textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="bg-card/50 border-border focus:border-primary resize-none"
              required
              aria-label="Your message"
              name="message"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" size="lg" className="flex-1 bg-primary hover:bg-primary/90">
              Send Message
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleBookCall}
              className="flex-1 border-primary hover:bg-primary/10"
              aria-label="Book a call on Instagram"
            >
              Book a Call
            </Button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-muted-foreground text-sm">
            © AlmostHuman 2025 | WLDD
          </div>

          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/almosthuman.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/almosthuman.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/almosthuman.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
