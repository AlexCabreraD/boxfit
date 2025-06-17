import { FormStep } from "@/components/membership/types/membershipTypes";

interface FormProgressProps {
  currentStep: FormStep;
  steps: Array<{ number: number; title: string }>;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <div key={step.number} className="flex-1">
              <div className="relative">
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute top-5 w-full h-0.5 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                    style={{ left: "50%" }}
                  />
                )}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-red-600 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {isCompleted ? "✓" : step.number}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      isActive ? "text-red-600" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress;
