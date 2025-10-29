import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-background/80" aria-label="Main navigation">
        <div className="text-xl font-bold tracking-wider" aria-label="AlmostHuman home">ALMOSTHUMAN</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="hover:bg-primary/20"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </nav>

      {/* Full-screen menu */}
      <div
        id="main-menu"
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <nav className="h-full flex flex-col justify-center items-center gap-8 px-6" aria-label="Main menu">
          <button
            onClick={() => scrollToSection("work")}
            className="text-4xl md:text-6xl font-bold hover:text-primary transition-colors focus:outline-none focus:text-primary"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Works
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-4xl md:text-6xl font-bold hover:text-primary transition-colors focus:outline-none focus:text-primary"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-4xl md:text-6xl font-bold hover:text-primary transition-colors focus:outline-none focus:text-primary"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            Contact Us
          </button>

          <div className="absolute bottom-8 left-8">
            <a
              href="mailto:Hello@almosthuman.in"
              className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:text-foreground"
              tabIndex={isMenuOpen ? 0 : -1}
              aria-label="Send email to Hello@almosthuman.in"
            >
              Hello@almosthuman.in
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
