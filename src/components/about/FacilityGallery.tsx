import FacilityGalleryClient from "./FacilityGalleryClient";
import { FacilityImage } from "./types";

const facilityImages: FacilityImage[] = [
  {
    id: 1,
    title: "Boxing Ring",
    description: "Professional-grade boxing ring for training and sparring",
    // Replace with actual images when available
    src: "/placeholder-ring.jpg",
  },
  {
    id: 2,
    title: "Heavy Bag Area",
    description: "Multiple heavy bags for technique and conditioning work",
    src: "/placeholder-heavybag.jpg",
  },
  {
    id: 3,
    title: "Speed Bag Section",
    description: "Speed bags to improve hand-eye coordination and rhythm",
    src: "/placeholder-speedbag.jpg",
  },
  {
    id: 4,
    title: "Training Floor",
    description: "Open floor space for group classes and personal training",
    src: "/placeholder-floor.jpg",
  },
  {
    id: 5,
    title: "Cardio Equipment",
    description: "Cardio machines for warm-up and conditioning work",
    src: "/placeholder-cardio.jpg",
  },
  {
    id: 6,
    title: "Strength Area",
    description: "Strength training equipment to complement boxing training",
    src: "/placeholder-strength.jpg",
  },
];

const FacilityGallery = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-accent text-3xl md:text-4xl mb-3 text-boxing-black">
            OUR <span className="text-boxing-red">FACILITY</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto">
            Take a virtual tour of our boxing gym in Clearfield, Utah
          </p>
        </div>

        <FacilityGalleryClient facilityImages={facilityImages} />

        <div className="mt-16 bg-white rounded-card shadow-card p-8">
          <h3 className="font-accent text-2xl text-boxing-black mb-6 text-center">
            STATE-OF-THE-ART <span className="text-boxing-red">EQUIPMENT</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-card p-5">
              <h4 className="font-semibold mb-2">Boxing Ring</h4>
              <p className="text-caption-text">
                Professional-grade ring with proper padding and tension for
                safe, effective training and sparring.
              </p>
            </div>

            <div className="border border-gray-200 rounded-card p-5">
              <h4 className="font-semibold mb-2">Heavy Bags</h4>
              <p className="text-caption-text">
                Multiple heavy bags of varying weights and styles for technique
                practice and strength development.
              </p>
            </div>

            <div className="border border-gray-200 rounded-card p-5">
              <h4 className="font-semibold mb-2">Speed Bags</h4>
              <p className="text-caption-text">
                Speed bags to improve hand-eye coordination, rhythm, and
                shoulder endurance.
              </p>
            </div>

            <div className="border border-gray-200 rounded-card p-5">
              <h4 className="font-semibold mb-2">Double-End Bags</h4>
              <p className="text-caption-text">
                Double-end bags to develop timing, accuracy, and defensive
                movements.
              </p>
            </div>

            <div className="border border-gray-200 rounded-card p-5">
              <h4 className="font-semibold mb-2">Focus Mitts</h4>
              <p className="text-caption-text">
                High-quality focus mitts for personalized training sessions with
                our coaches.
              </p>
            </div>

            <div className="border border-gray-200 rounded-card p-5">
              <h4 className="font-semibold mb-2">Training Gloves</h4>
              <p className="text-caption-text">
                Various sizes of training gloves available for members to use
                during sessions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-steel-gray">
            Located at: 1740 S 300th W, Clearfield, UT 84015
          </p>
        </div>
      </div>
    </section>
  );
};

export default FacilityGallery;
