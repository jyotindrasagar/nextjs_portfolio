export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  agency?: string;
  agencyLink?: string;
  project: string;
  link?: string;
  avatar?: string;
}

/*
===================================================================
  HOW TO ADD / EDIT CLIENT FEEDBACK & TESTIMONIALS
===================================================================
  Copy & paste the template below into the `testimonials` array:

  {
    quote: "Your client testimonial quote goes here. Multi-line quotes are supported.",
    author: "Client Name",
    role: "Client Role / Title",               // e.g. "Content Creator", "CEO", "Singer/Songwriter"
    company: "Company or Studio Name",         // Optional company/brand name
    agency: "Agency Name",                     // Optional agency name
    agencyLink: "https://agency-website.com",  // Optional agency website link
    project: "Project - Marketing Video",      // Project or Collaboration Title
    link: "https://instagram.com/client",      // Optional social/portfolio link or ""
    avatar: "https://your-r2-or-image-url.jpg" // Optional avatar image URL
  },
===================================================================
*/

export const testimonials: Testimonial[] = [
  {
    quote: "Extremely talented and responsive. Would highly recommend for digital marketing.",
    author: "Jacob Jhansen",
    role: "CEO",
    company: "ALA Engineering",
    project: "Product Marketing Video",
    link: "https://ala.engineering/eld",
    avatar: "https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/Feedback%20profiles/jacob.jpeg"
  },
  {
    quote: "Working with Dieablo was genuinely incredible. I asked him to create a VFX shot of a London train station sign with flickering lights revealing the release date of my music video, and he absolutely nailed the vision. He understood exactly what I was going for from the start, delivered before the deadline, and kept refining it until it was perfect.\n\nHis communication was amazing! Super responsive, clear, and easy to work with and the quality of the final result was way beyond what I expected, especially for such an amazing price.\n\nI’m extremely happy with the outcome and would 100% work with him again in the future. If you need any VFX work done, I fully recommend Dieablo. He did such a great job.",
    author: "Ashley Marie",
    role: "Singer/Songwriter",
    company: "",
    project: "Project - teaser for 'Charing Cross'",
    link: "https://www.instagram.com/ashleymariesattic/",
    avatar: "https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/Feedback%20profiles/ashley%20marie.jpg"
  },

  {
    quote: "I've worked with Dieablo for outsourcing editing countless times and his work is out of this world. From his VFX compositing to simple cutting, I have always had a great experience working together. And Quick turn around with good communication makes him one of the best editors you can ask for.",
    author: "Luke Darby",
    role: "Videographer & Editor",
    company: "",
    project: "Editorial Collaboration ",
    link: "https://www.instagram.com/lukedarbyedits/",
    avatar: "https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/Feedback%20profiles/darby.png"
  },
  {
    quote: "Working with Dieablo was great! He handled the editing and motion graphics for our long-form documentaries, and the final videos came together really well. He understood the story, pacing, and visual direction from the start, and brought everything together without losing the documentary feel. Really happy with the work and would definitely recommend him to anyone.",
    author: "Valcs Documentaries",
    role: "Content Creator",
    company: "",
    project: "Project - Youtube Documentaries",
    link: "",
    avatar: "https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/Feedback%20profiles/valcs%20documentries.jpg"
  },
  {
    quote: "Dieablo’s visual effects genuinely stunned me. The way he brought the marketing video together made the whole piece feel much more polished and impactful. The VFX he added for the two the videos we commisioned him for were spot on and was exactly what we wanted.",
    author: "Nimit ",
    role: "Client Role / Title",               // e.g. "Content Creator", "CEO", "Singer/Songwriter"
    company: "Company or Studio Name",         // Optional company/brand name
    agency: "Agency Name",                     // Optional agency name
    agencyLink: "https://agency-website.com",  // Optional agency website link
    project: "Project - Marketing Video",      // Project or Collaboration Title
    link: "https://instagram.com/client",
    avatar: "https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/Feedback%20profiles/jacob.jpeg"
  },













];
