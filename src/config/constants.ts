// Site Configuration
export const SITE_CONFIG = {
  name: "AlmostHuman",
  tagline: "Born from emotion, built with AI",
  email: "Hello@almosthuman.in",
  instagram: "https://www.instagram.com/almosthuman.in/",
  twitter: "https://x.com/Almosthumanin",
  linkedin: "https://www.linkedin.com/company/almosthuman-in/?viewAsMember=true",
  copyright: "© AlmostHuman 2025 | WLDD",
} as const;

// Form Configuration
export const FORM_CONFIG = {
  web3FormsAccessKey: "a849a796-0af5-4635-bb4d-3bb8fa441fb9",
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
  { value: "misc", label: "Others" },
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

// Work Videos (Google Drive IDs or YouTube IDs)
export const WORK_VIDEOS = [
  { id: "1XFMu6hrZalEyNbP9WiOz3F7sIO4biRRx", title: "Jeevansathi", description: "Branding, Web Design and Development", type: "drive" },
  { id: "1zsST6C9bDywLDOWCn1QvulTlGex--IZ4", title: "Myntra", description: "Branding, Web Design and Development", type: "drive" },
  { id: "1CnfZcjIhRJABJalE6Y_F0-di4cgTOP9M", title: "Philips", description: "Branding, Web Design and Development", type: "drive" },
  { id: "SVmIzkThDh0", title: "Tata", description: "Branding, Web Design and Development", type: "youtube" },
] as const;

// Personal Projects Videos (Google Drive IDs)
export const PERSONAL_PROJECTS_VIDEOS = [
  { id: "1Qje_a46U-HITm3yDUMN4wYEGPnzR_cup", title: "Invisible" },
  { id: "1aubmPIP4MoMcGIsRrKQdcPsQFcekxalY", title: "Memories" },
  { id: "129QspelqbVprRiBo8ZtiFCl2520Sy53D", title: "Bob & Me" },
  { id: "1VhhsHuGfIQ0IrtpEOLjqzZzmPobLZH91", title: "Born" },
] as const;
