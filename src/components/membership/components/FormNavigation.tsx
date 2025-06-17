import { FormStep } from "@/components/membership/types/membershipTypes";

interface FormNavigationProps {
  currentStep: FormStep;
  totalSteps: number;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <div className="mt-8 pt-6 border-t flex justify-between">
      {currentStep > 0 && (
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Previous
        </button>
      )}

      <div className="ml-auto">
        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              canProceed
                ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentStep === 0 ? "Continue with Selected Plan" : "Next Step"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
            className={`px-8 py-3 rounded-md font-bold text-lg transition-colors ${
              canProceed && !isSubmitting
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Complete Registration"}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormNavigation;
