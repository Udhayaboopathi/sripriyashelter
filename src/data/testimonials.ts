import type { Testimonial } from "@/types/content";

/**
 * Testimonials exactly as published in the original home-page slider.
 * Marked needs-verification: the roles reference project names
 * (Sripriya Gardens / Heights / Enclave) that are not listed among the published projects.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner at Sripriya Gardens",
    quote:
      "Buying our home from Sripriya Shelter was the best decision we made. The quality of construction exceeded our expectations, and the team was incredibly supportive throughout the process. Highly recommended!",
    rating: 5,
    contentStatus: "needs-verification",
  },
  {
    name: "Priya Sharma",
    role: "Homeowner at Sripriya Heights",
    quote:
      "What impressed me most was their transparency. No hidden costs, no surprises. Everything was exactly as promised. The attention to detail in every corner of our apartment is remarkable.",
    rating: 5,
    contentStatus: "needs-verification",
  },
  {
    name: "Arun Nair",
    role: "Investor",
    quote:
      "I've invested in multiple Sripriya Shelter projects and have always been satisfied with the returns. Their commitment to timely delivery and quality construction makes them a trustworthy partner.",
    rating: 5,
    contentStatus: "needs-verification",
  },
  {
    name: "Meena Reddy",
    role: "Homeowner at Sripriya Enclave",
    quote:
      "From the first meeting to handing over the keys, the experience was seamless. The team understood our needs perfectly and delivered a home that our family absolutely loves.",
    rating: 5,
    contentStatus: "needs-verification",
  },
];
