// Form Types
export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

// Video Types
export interface Video {
  id: string;
  title: string;
}

// Client Types
export interface Client {
  name: string;
  logo: string;
}

// Navigation Types
export interface NavLink {
  id: string;
  label: string;
}
