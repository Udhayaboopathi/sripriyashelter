import { siteAssets } from "@/data/assets";

/**
 * Page copy transcribed verbatim from the original site (home, about, contact,
 * projects, gallery). Kept in one typed module so UI components stay content-free.
 */
export const homeContent = {
  hero: {
    eyebrow: "Welcome to Sripriya Shelter",
    titleLead: "Crafting Quality Homes for",
    titleAccent: "Tomorrow",
    subtitle: "Modern architecture, trusted construction, customer-focused service.",
    slides: [siteAssets.office.main, siteAssets.home.residentialElevation, siteAssets.individualHouse.elevation],
  },
  about: {
    eyebrow: "About Us",
    title: "Crafting Homes That Stand the Test of Time",
    paragraphs: [
      "At Sripriya Shelter, we specialize in delivering high-quality construction services with precision, dedication, and trust. Founded by Nethaji, our company is built on the values of integrity, craftsmanship, and customer satisfaction.",
      "Whether it's residential, commercial, or renovation projects, we bring your ideas to life - on time and within budget.",
    ],
    services: [
      "Residential Construction (Independent Homes, Villas, Apartments)",
      "Commercial Projects (Offices, Shops, Warehouses)",
      "Renovation & Remodeling",
      "Interior Works",
      "Project Management & Consulting",
    ],
    badge: { value: "5+", label: "Years of Trust" },
    image: siteAssets.office.main,
  },
  whyChooseUs: {
    eyebrow: "Why Choose Us",
    title: "Building Trust Through Excellence",
    description:
      "What sets Sripriya Shelter apart from the rest? Our unwavering commitment to quality, transparency, and customer satisfaction.",
    items: [
      {
        icon: "shield",
        title: "Quality Construction",
        text: "We use only premium materials and follow the highest construction standards to ensure your home lasts for generations.",
        image: siteAssets.individualHouse.site03,
      },
      {
        icon: "clock",
        title: "On-Time Delivery",
        text: "Time is valuable. We are committed to delivering every project on schedule without compromising on quality.",
        image: siteAssets.roseland.elevation,
      },
      {
        icon: "file-check",
        title: "Transparent Process",
        text: "No hidden costs, no surprises. We maintain complete transparency in pricing, documentation, and project updates.",
        image: siteAssets.office.conference,
      },
      {
        icon: "users",
        title: "Customer-Centric Support",
        text: "From your first inquiry to after-sales support, our dedicated team is here to assist you at every step.",
        image: siteAssets.office.reception,
      },
    ],
  },
  projects: {
    eyebrow: "Our Projects",
    title: "Discover Your Dream Home",
    description: "Explore our portfolio of thoughtfully designed residential projects across Bangalore.",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "What Our Customers Say",
    description:
      "Don't just take our word for it. Hear from the families who have made Sripriya Shelter their trusted home builder.",
  },
  cta: {
    title: "Looking for Your Dream Home?",
    description: "We're here to help you find the perfect place to call home. Let's start the conversation today.",
  },
};

export const aboutContent = {
  hero: {
    eyebrow: "About Us",
    title: "Building Dreams Since 2008",
    subtitle: "Quality homes built with trust and craftsmanship.",
    image: siteAssets.office.main,
  },
  story: {
    title: "Our Story",
    badge: { value: "5+", label: "Years Experience" },
    paragraphs: [
      "Sripriya Shelter stands for quality without compromise. Our mission is to build long-lasting, modern homes that bring comfort and stability to families. With strong values, transparent processes, and customer-first thinking, we continue to shape communities with pride.",
      "Over the years, we have delivered more than 3 successful projects and helped over 200 families find their perfect home. Our success is built on a foundation of quality construction, transparent dealings, and unwavering customer focus.",
    ],
    stats: [
      { value: "4+", label: "Projects" },
      { value: "200+", label: "Homes" },
      { value: "5+", label: "Years" },
    ],
  },
  leadership: {
    eyebrow: "Leadership",
    title: "Meet Our Founder",
    people: [
      {
        name: "U. Nethaji - Founder",
        image: siteAssets.team.founder,
        bio: "we specialize in delivering high-quality construction services with precision, dedication, and trust. Founded by Nethaji, our company is built on the values of integrity, craftsmanship, and customer satisfaction.",
      },
      {
        name: "UN. Srinath - CEO",
        image: siteAssets.team.ceo,
        bio: "At our core, we're committed to building homes that blend quality, trust, and sustainability. With a customer-first approach, we strive to create spaces where families thrive and dreams take shape. Our mission is to deliver excellence in every brick, and integrity in every deal.",
      },
    ],
    stats: [
      { value: "15+", label: "Years in Industry" },
      { value: "4+", label: "Projects Led" },
      { value: "200+", label: "Families Served" },
    ],
  },
  vision:
    "To be the most trusted name in residential construction, known for creating sustainable communities where families thrive. We envision a future where every home we build becomes a cherished space for generations.",
  mission:
    "To deliver exceptional living spaces through quality construction, innovative design, and customer-centric service. We are committed to making the home-buying journey transparent, enjoyable, and rewarding for every family.",
  office: {
    eyebrow: "Our Workspace",
    title: "Inside Our Office",
    description: "Our office reflects our teamwork, dedication, and passion for delivering quality homes.",
    images: [siteAssets.office.conference, siteAssets.office.reception, siteAssets.office.main, siteAssets.office.workspace],
  },
  values: {
    eyebrow: "Our Values",
    title: "What Drives Us",
    description: "Our core values guide every decision we make and every home we build.",
    items: [
      { icon: "award", title: "Excellence", text: "We strive for excellence in every project, ensuring the highest standards of quality and craftsmanship." },
      { icon: "handshake", title: "Integrity", text: "Honesty and transparency are the foundations of our relationships with clients and partners." },
      { icon: "lightbulb", title: "Innovation", text: "We embrace modern techniques and sustainable practices to build homes for the future." },
      { icon: "target", title: "Commitment", text: "Our commitment to timely delivery and customer satisfaction drives everything we do." },
    ],
  },
  milestones: {
    eyebrow: "Our Journey",
    title: "Milestones Along the Way",
    /** needs-verification: figures conflict with the 5+ years / 200+ homes stats published elsewhere. */
    items: [
      { year: "2008", title: "Company Founded", text: "Sripriya Shelter was established with a vision to build quality homes." },
      { year: "2012", title: "First Major Project", text: "Completed our first residential complex with 100+ units." },
      { year: "2016", title: "1000 Happy Families", text: "Crossed the milestone of delivering homes to 1000 families." },
      { year: "2020", title: "Green Building Award", text: "Received recognition for sustainable construction practices." },
      { year: "2024", title: "2000+ Homes Delivered", text: "Continuing to grow while maintaining our commitment to quality." },
    ],
  },
};

export const projectsPageContent = {
  hero: {
    eyebrow: "Our Portfolio",
    title: "Explore Our Projects",
    subtitle: "Premium homes designed for comfort, safety, and value.",
    image: siteAssets.roseland.elevation,
  },
  filters: ["All", "Ongoing", "Completed", "Upcoming"] as const,
};

export const galleryPageContent = {
  hero: {
    eyebrow: "Our Gallery",
    title: "Excellence in Every Frame",
    subtitle: "Our projects, spaces, and milestones captured beautifully.",
    image: siteAssets.office.conference,
  },
};

export const contactPageContent = {
  hero: {
    eyebrow: "Get in Touch",
    title: "We'd Love to Hear From You",
    subtitle: "Questions about projects or pricing? Reach out anytime.",
    image: siteAssets.office.reception,
  },
  info: {
    title: "Contact Information",
    description:
      "Reach out to us through any of the following channels. We're always ready to assist you with your property inquiries.",
  },
  form: {
    title: "Send Us a Message",
    description: "Fill out the form below and our team will get back to you within 24 hours.",
  },
  projectForm: {
    title: "Interested in this project?",
    description: "Fill in your details and our team will get back to you shortly.",
  },
};
