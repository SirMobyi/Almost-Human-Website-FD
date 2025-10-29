import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Twitter, Linkedin, Loader2 } from "lucide-react";
import { contactFormSchema, sanitizeInput } from "@/lib/formValidation";
import { SITE_CONFIG, FORM_CONFIG, PROJECT_TYPES } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { ContactFormData } from "@/types";

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const { toast } = useToast();
  const { targetRef, hasIntersected } = useIntersectionObserver();

  // Load saved draft from localStorage
  useEffect(() => {
    const savedDraft = localStorage.getItem("contactFormDraft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setFormData(draft);
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      localStorage.setItem("contactFormDraft", JSON.stringify(formData));
    }
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < FORM_CONFIG.rateLimitDelay) {
      toast({
        title: "Please wait",
        description: "Please wait a moment before submitting again",
        variant: "destructive",
      });
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      projectType: formData.projectType,
      message: sanitizeInput(formData.message),
    };

    // Validate using Zod
    const validation = contactFormSchema.safeParse(sanitizedData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    try {
      // Submit to Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: FORM_CONFIG.web3FormsAccessKey,
          name: sanitizedData.name,
          email: sanitizedData.email,
          project_type: sanitizedData.projectType,
          message: sanitizedData.message,
          from_name: "AlmostHuman Contact Form",
          subject: `New ${sanitizedData.projectType} inquiry from ${sanitizedData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent! 🎉",
          description: "We'll get back to you within 24 hours.",
        });

        // Clear form and localStorage
        setFormData({ name: "", email: "", projectType: "", message: "" });
        localStorage.removeItem("contactFormDraft");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or email us directly at " + SITE_CONFIG.email,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookCall = () => {
    window.open(SITE_CONFIG.instagram, "_blank");
  };

  return (
    <section
      id="contact"
      ref={targetRef as React.RefObject<HTMLElement>}
      className={`py-20 px-6 bg-gradient-to-b from-background to-background/80 transition-opacity duration-700 ${
        hasIntersected ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Let's create something almost human.
          </h2>
          <p className="text-xl text-muted-foreground">Your imagination made real.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-8" aria-label="Contact form">
          <div>
            <Label htmlFor="name" className="sr-only">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-card/50 border-border focus:border-primary"
              required
              maxLength={FORM_CONFIG.maxNameLength}
              disabled={isSubmitting}
              name="name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-card/50 border-border focus:border-primary"
              required
              maxLength={FORM_CONFIG.maxEmailLength}
              disabled={isSubmitting}
              name="email"
            />
          </div>

          <div>
            <Label htmlFor="projectType" className="sr-only">Project Type</Label>
            <Select
              value={formData.projectType}
              onValueChange={(value) => setFormData({ ...formData, projectType: value })}
              disabled={isSubmitting}
              required
            >
              <SelectTrigger id="projectType" className="bg-card/50 border-border focus:border-primary">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="sr-only">Message</Label>
            <Textarea
              id="message"
              placeholder="Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="bg-card/50 border-border focus:border-primary resize-none"
              required
              maxLength={FORM_CONFIG.maxMessageLength}
              disabled={isSubmitting}
              name="message"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {formData.message.length}/{FORM_CONFIG.maxMessageLength}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="submit"
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={handleBookCall}
              className="flex-1 border-primary hover:bg-primary/10"
              disabled={isSubmitting}
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
          <div className="text-muted-foreground text-sm">{SITE_CONFIG.copyright}</div>

          <div className="flex gap-6">
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href={SITE_CONFIG.instagram}
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
