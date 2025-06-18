import { FormStep } from "@/components/membership/types/membershipTypes";

interface FormProgressProps {
  currentStep: FormStep;
  steps: Array<{ number: number; title: string }>;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      {/* Mobile Progress Bar */}
      <div className="block md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm font-medium text-red-600">
            {steps[currentStep]?.title}
          </span>
        </div>
      </div>

      {/* Desktop Step Indicators */}
      <div className="hidden md:block">
        <div className="flex justify-between items-start">
          {steps.map((step, index) => {
            const isActive = step.number === currentStep;
            const isCompleted = step.number < currentStep;

            return (
              <div key={step.number} className="flex-1 relative">
                {/* Connection Line */}
                {index !== steps.length - 1 && (
                  <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-300 -z-10">
                    <div
                      className={`h-full bg-green-500 transition-all duration-300 ${
                        isCompleted ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                )}

                {/* Step Circle and Label */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-red-600 text-white ring-4 ring-red-200"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.number + 1
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium text-center px-2 transition-colors duration-200 ${
                      isActive
                        ? "text-red-600"
                        : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormProgress;
