import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Instagram, Linkedin, Loader2 } from "lucide-react";
import { contactFormSchema, sanitizeInput } from "@/lib/formValidation";
import { SITE_CONFIG, FORM_CONFIG, PROJECT_TYPES } from "@/config/constants";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { ContactFormData } from "@/types";
const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const {
    toast
  } = useToast();
  const {
    targetRef,
    hasIntersected
  } = useIntersectionObserver();

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
        variant: "destructive"
      });
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      projectType: formData.projectType,
      message: sanitizeInput(formData.message)
    };

    // Validate using Zod
    const validation = contactFormSchema.safeParse(sanitizedData);
    if (!validation.success) {
      const firstError = validation.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive"
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
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: FORM_CONFIG.web3FormsAccessKey,
          name: sanitizedData.name,
          email: sanitizedData.email,
          project_type: sanitizedData.projectType,
          message: sanitizedData.message,
          from_name: "AlmostHuman Contact Form",
          subject: `New ${sanitizedData.projectType} inquiry from ${sanitizedData.name}`
        })
      });
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Message Sent! 🎉",
          description: "We'll get back to you within 24 hours."
        });

        // Clear form and localStorage
        setFormData({
          name: "",
          email: "",
          projectType: "",
          message: ""
        });
        localStorage.removeItem("contactFormDraft");
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or email us directly at " + SITE_CONFIG.email,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBookCall = () => {
    window.open("https://calendly.com/almosthumandotin/30min", "_blank");
  };
  return <section id="contact" ref={targetRef as React.RefObject<HTMLElement>} className={`py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-black transition-opacity duration-700 ${hasIntersected ? "animate-fade-in" : "opacity-0"}`}>
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-black/50 border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white">
              Let's create something <span className="whitespace-nowrap">Almost Human.</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-white/70">Your imagination made real.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 mb-6 sm:mb-8" aria-label="Contact form">
            <div>
              <Label htmlFor="name" className="sr-only">Name</Label>
              <Input id="name" type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="bg-black/50 border-white/30 text-white placeholder:text-white/50 focus:border-white h-12 text-base" required maxLength={FORM_CONFIG.maxNameLength} disabled={isSubmitting} name="name" autoComplete="name" />
            </div>

            <div>
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input id="email" type="email" inputMode="email" placeholder="Email" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} className="bg-black/50 border-white/30 text-white placeholder:text-white/50 focus:border-white h-12 text-base" required maxLength={FORM_CONFIG.maxEmailLength} disabled={isSubmitting} name="email" autoComplete="email" />
            </div>

            <div>
              <Label htmlFor="projectType" className="sr-only">Project Type</Label>
              <Select value={formData.projectType} onValueChange={value => setFormData({
              ...formData,
              projectType: value
            })} disabled={isSubmitting} required>
                <SelectTrigger id="projectType" className="bg-black/50 border-white/30 text-white focus:border-white h-12 text-base">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent className="bg-black border border-white/30 text-white z-50">
                  {PROJECT_TYPES.map(type => <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message" className="sr-only">Message</Label>
              <Textarea id="message" placeholder="Message" value={formData.message} onChange={e => setFormData({
              ...formData,
              message: e.target.value
            })} rows={6} className="bg-black/50 border-white/30 text-white placeholder:text-white/50 focus:border-white resize-none text-base" required maxLength={FORM_CONFIG.maxMessageLength} disabled={isSubmitting} name="message" />
              <p className="text-xs text-white/50 mt-1 text-right">
                {formData.message.length}/{FORM_CONFIG.maxMessageLength}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" size="lg" className="flex-1 bg-white text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 h-12 md:h-14 text-lg sm:text-lg font-bold !scale-100 !translate-y-0 !translate-x-0" disabled={isSubmitting}>
                {isSubmitting ? <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </> : "Send Message"}
              </Button>
              <Button type="button" size="lg" onClick={handleBookCall} className="flex-1 bg-white text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 h-12 md:h-14 text-lg sm:text-lg font-bold !scale-100 !translate-y-0 !translate-x-0" disabled={isSubmitting} aria-label="Book a call on Calendly">
                Book a Call
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6 py-6">
          <div className="text-white text-sm">{SITE_CONFIG.copyright}</div>

          <div className="flex gap-6">
            <a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={SITE_CONFIG.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="X (formerly Twitter)">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/70 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </section>;
};
export default ContactSection;