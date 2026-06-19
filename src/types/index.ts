export type Locale = "en" | "am" | "om";

export interface NavLink {
  href:  string;
  label: string;
}

export interface Service {
  id:    string;
  icon:  string;
  title: string;
  desc:  string;
}

export interface Destination {
  id:      string;
  flag:    string;
  country: string;
  city:    string;
  jobs:    string;
  color:   string;
}

export interface Stat {
  value:     number;
  suffix:    string;
  label:     string;
  label_key: string;
}

export interface Testimonial {
  id:       number;
  name:     string;
  location: string;
  text:     string;
  rating:   number;
  avatar:   string;
}

export interface ProcessStep {
  step:  number;
  title: string;
  desc:  string;
  icon:  string;
}