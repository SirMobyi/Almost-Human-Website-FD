// Site Configuration
export const SITE_CONFIG = {
  name: "AlmostHuman",
  tagline: "Making AI films feel human",
  email: "Hello@almosthuman.in",
  instagram: "https://www.instagram.com/almosthuman.in/",
  copyright: "© AlmostHuman 2025 | WLDD",
} as const;

// Form Configuration
export const FORM_CONFIG = {
  web3FormsAccessKey: "YOUR_WEB3FORMS_ACCESS_KEY", // Replace with your actual key
  maxNameLength: 100,
  maxEmailLength: 255,
  maxMessageLength: 1000,
  rateLimitDelay: 3000, // 3 seconds between submissions
} as const;

// Project Types for Contact Form
export const PROJECT_TYPES = [
  { value: "commercial", label: "Commercial" },
  { value: "film", label: "Film" },
  { value: "music-video", label: "Music Video" },
  { value: "misc", label: "Miscellaneous" },
] as const;

// Navigation Links
export const NAV_LINKS = [
  { id: "work", label: "Works", href: "#work" },
  { id: "services", label: "Services", href: "#services" },
  { id: "contact", label: "Contact Us", href: "#contact" },
] as const;

// Video Showcase (YouTube IDs)
export const SHOWCASE_VIDEO = {
  id: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
  title: "Our Showreel",
} as const;

// Work Videos (YouTube IDs)
export const WORK_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Project One" }, // Replace with actual IDs
  { id: "dQw4w9WgXcQ", title: "Project Two" },
  { id: "dQw4w9WgXcQ", title: "Project Three" },
  { id: "dQw4w9WgXcQ", title: "Project Four" },
] as const;
