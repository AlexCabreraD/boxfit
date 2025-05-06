import TestimonialsClient from "./TestimonialsClient";
import { Testimonial } from "./types";

const testimonials: Testimonial[] = [
  {
    name: "Michael R.",
    image: "/default-avatar.jpg", // Replace with actual images when available
    role: "Fitness Member, 8 months",
    quote:
      "I've tried many gyms over the years, but BoxFit Utah has completely transformed my fitness journey. The coaches are attentive and the community is so supportive. I've lost 25 pounds and gained confidence I never had before.",
    stars: 5,
  },
  {
    name: "Sarah T.",
    image: "/default-avatar.jpg",
    role: "Parent of Junior Boxer",
    quote:
      "My son has been in the kids' program for 6 months, and the change in him is remarkable. He's more disciplined, focused in school, and his confidence has skyrocketed. The coaches are amazing with children!",
    stars: 5,
  },
  {
    name: "David L.",
    image: "/default-avatar.jpg",
    role: "Competitive Boxer, 2 years",
    quote:
      "Training at BoxFit has elevated my competitive game to levels I never thought possible. The professional coaching and personalized attention have helped me win my last three fights. This gym is the real deal.",
    stars: 5,
  },
  {
    name: "Elena M.",
    image: "/default-avatar.jpg",
    role: "Beginner, 3 months",
    quote:
      "I was intimidated to try boxing at first, but the team at BoxFit made me feel welcome from day one. As a complete beginner, I appreciate how they break down techniques and provide a supportive environment to learn.",
    stars: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-boxing-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-white">
            SUCCESS <span className="text-boxing-red">STORIES</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-steel-gray">
            Hear from our community about their transformative boxing journeys
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <TestimonialsClient testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
