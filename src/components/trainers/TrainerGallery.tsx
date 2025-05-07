import TrainerGalleryClient from "./TrainerGalleryClient";

const TrainerGallery = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-accent text-3xl md:text-4xl mb-4 text-boxing-black diagonal-accent inline-block">
              TRAINING <span className="text-boxing-red">IN ACTION</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-body-text mt-10">
              See our coaches in action with members of all skill levels
            </p>
          </div>

          <TrainerGalleryClient />

          <div className="mt-12 accent-box p-8 bg-white rounded-card shadow-card">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-16 h-16 bg-boxing-red rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 14.5V9.5L13 12L8 14.5Z" fill="currentColor" />
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-body-text max-w-3xl">
                At BoxFit Utah, we believe in hands-on training that focuses on
                proper technique, strategic development, and personalized
                attention to help you achieve your goals. Our coaches work
                closely with each member to develop customized training plans
                that align with their specific objectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerGallery;
