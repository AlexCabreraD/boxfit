import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";

const ExperienceInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
  onSkip,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSkipExperience = () => {
    updateFormData({
      boxingExperience: "none",
      otherCombatSportsExperience: "",
      fitnessLevel: "beginner",
      goals: "",
    });
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Experience & Fitness Background
        </h2>
        <p className="text-gray-600">
          Help us understand your background so we can provide the best training
          experience. <strong>All fields in this section are optional.</strong>
        </p>
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Optional Section:</strong> This information helps us tailor
            your training, but you can skip it if you prefer.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleSkipExperience}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
        >
          ⏭️ Skip Experience Questions
        </button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Boxing & Fitness Experience{" "}
          <span className="text-sm text-gray-500 font-normal">(Optional)</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="boxingExperience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Boxing Experience{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <select
              id="boxingExperience"
              name="boxingExperience"
              value={formData.boxingExperience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="none">No experience</option>
              <option value="beginner">Beginner (less than 6 months)</option>
              <option value="intermediate">
                Intermediate (6 months - 2 years)
              </option>
              <option value="advanced">Advanced (2+ years)</option>
              <option value="competitive">Competitive boxer</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="otherCombatSportsExperience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Other Combat Sports Experience{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="otherCombatSportsExperience"
              name="otherCombatSportsExperience"
              value={formData.otherCombatSportsExperience}
              onChange={handleChange}
              rows={2}
              placeholder="List any experience in MMA, wrestling, martial arts, etc..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="fitnessLevel"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Fitness Level{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="beginner">
                Beginner - Little to no regular exercise
              </option>
              <option value="moderate">
                Moderate - Exercise 1-2 times per week
              </option>
              <option value="active">
                Active - Exercise 3-4 times per week
              </option>
              <option value="very-active">
                Very Active - Exercise 5+ times per week
              </option>
              <option value="athlete">
                Athlete - Competitive sports training
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="goals"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Boxing Goals{" "}
              <span className="text-gray-500">(Optional)</span>
            </label>
            <textarea
              id="goals"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows={3}
              placeholder="What do you hope to achieve through boxing training? (fitness, self-defense, competition, etc.)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Remember:</strong> All information in this section is optional
          and helps us provide better training. You can always update this
          information later or discuss your goals with Coach Pablo during your
          free trial.
        </p>
      </div>
    </div>
  );
};

export default ExperienceInfoStep;
