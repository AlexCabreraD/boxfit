"use client";

import { useState, useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoStar } from "react-icons/io5";

const testimonials = [
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  const prevTestimonial = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
      );

      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }
  };

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset interval when manually navigating
  const handleManualNav = (direction: "next" | "prev") => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (direction === "next") {
      nextTestimonial();
    } else {
      prevTestimonial();
    }

    intervalRef.current = setInterval(() => {
      nextTestimonial();
    }, 6000);
  };

  // Render star ratings
  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => <IoStar key={index} className="text-accent-gold" />);
  };

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
          {/* Navigation buttons */}
          <button
            onClick={() => handleManualNav("prev")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 bg-boxing-red p-2 rounded-full text-white focus:outline-none hover:bg-opacity-90 transition-colors"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={() => handleManualNav("next")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 bg-boxing-red p-2 rounded-full text-white focus:outline-none hover:bg-opacity-90 transition-colors"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Testimonial content */}
          <div className="bg-steel-gray bg-opacity-20 p-8 md:p-12 rounded-lg relative overflow-hidden">
            <div
              className="w-24 h-24 bg-boxing-red opacity-20 rounded-full absolute -top-12 -right-12"
              aria-hidden="true"
            />
            <div
              className="w-24 h-24 bg-accent-gold opacity-20 rounded-full absolute -bottom-12 -left-12"
              aria-hidden="true"
            />

            <div
              className={`transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
            >
              <div className="flex flex-col md:flex-row md:items-center mb-6">
                <div className="w-20 h-20 mb-4 md:mb-0 md:mr-6 relative rounded-full overflow-hidden bg-steel-gray flex-shrink-0">
                  {/* Replace with actual image when available */}
                  <div className="w-full h-full rounded-full bg-boxing-black opacity-40"></div>
                </div>

                <div>
                  <h3 className="font-primary font-semibold text-xl">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-steel-gray">
                    {testimonials[currentIndex].role}
                  </p>
                  <div className="flex mt-1">
                    {renderStars(testimonials[currentIndex].stars)}
                  </div>
                </div>
              </div>

              <blockquote className="italic text-lg md:text-xl relative">
                <span className="font-accent text-6xl text-boxing-red absolute -top-6 -left-2 opacity-30">
                  &#34;
                </span>
                {testimonials[currentIndex].quote}
                <span className="font-accent text-6xl text-boxing-red absolute -bottom-14 -right-2 opacity-30">
                  &#34;
                </span>
              </blockquote>
            </div>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  handleManualNav(index > currentIndex ? "next" : "prev");
                }}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-boxing-red" : "bg-steel-gray"}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
