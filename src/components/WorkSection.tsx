import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const videos = [
  { id: 1, title: "Project 1" },
  { id: 2, title: "Project 2" },
  { id: 3, title: "Project 3" },
  { id: 4, title: "Project 4" },
  { id: 5, title: "Project 5" },
  { id: 6, title: "Project 6" },
  { id: 7, title: "Project 7" },
];

const WorkSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="py-20 px-6 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        {/* Heading with decorative background */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 relative z-10">
              Not another AI studio
            </h2>
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" aria-hidden="true" />
          </div>
        </div>

        {/* Subheading */}
        <p className="text-center text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed">
          We don't chase trends or the algorithm. We chase emotion. AlmostHuman is built by
          creators who believe AI shouldn't replace creativity; it should amplify it. We use AI to
          tell stories that feel alive, making AI films feel human.
        </p>

        {/* Video carousel */}
        <div className="relative" role="region" aria-label="Work showcase carousel">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 z-10 hover:bg-primary/20"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <div className="w-full max-w-5xl aspect-video bg-muted/20 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 border-2 border-primary rounded-full flex items-center justify-center" aria-hidden="true">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-muted-foreground" aria-live="polite">Video {currentIndex + 1} of {videos.length}</p>
                <p className="text-sm text-muted-foreground/60 mt-2">Upload your work videos here</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 z-10 hover:bg-primary/20"
              aria-label="Next video"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
