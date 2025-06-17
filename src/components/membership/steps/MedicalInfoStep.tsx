import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";
import { FormData } from "@/components/membership/types/membershipTypes";

const MedicalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    updateFormData({ [name]: type === "checkbox" ? checked : value });
  };

  const medicalConditions = [
    {
      name: "hasHeartCondition",
      label: "Heart condition or cardiovascular disease",
    },
    { name: "hasSeizureDisorder", label: "Seizure disorder or epilepsy" },
    { name: "hasHeadInjuries", label: "Previous head injuries or concussions" },
    { name: "hasBreathingProblems", label: "Asthma or breathing problems" },
    { name: "hasDiabetes", label: "Diabetes" },
    { name: "hasHighBloodPressure", label: "High blood pressure" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Medical Information & Health History
        </h2>
        <p className="text-gray-600">
          This information helps us ensure your safety during training. All
          information is kept confidential.
        </p>
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> If you have any serious medical
            conditions, you may be required to provide physician clearance
            before participating.
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Medical Conditions
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Please check any conditions that apply to you:
        </p>
        <div className="space-y-3">
          {medicalConditions.map((condition) => (
            <label key={condition.name} className="flex items-start">
              <input
                type="checkbox"
                name={condition.name}
                checked={formData[condition.name as keyof FormData] as boolean}
                onChange={handleChange}
                className="mt-1 mr-3"
              />
              <span className="text-gray-700">{condition.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="otherMedicalConditions"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Other Medical Conditions
        </label>
        <textarea
          id="otherMedicalConditions"
          name="otherMedicalConditions"
          value={formData.otherMedicalConditions}
          onChange={handleChange}
          rows={3}
          placeholder="Please list any other medical conditions we should be aware of..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label
          htmlFor="currentMedications"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Current Medications
        </label>
        <textarea
          id="currentMedications"
          name="currentMedications"
          value={formData.currentMedications}
          onChange={handleChange}
          rows={3}
          placeholder="List any medications you are currently taking..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div>
        <label
          htmlFor="allergies"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Allergies
        </label>
        <textarea
          id="allergies"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          rows={2}
          placeholder="List any allergies (medications, foods, etc.)..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Physical History & Experience
        </h3>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="previousInjuries"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Previous Injuries
            </label>
            <textarea
              id="previousInjuries"
              name="previousInjuries"
              value={formData.previousInjuries}
              onChange={handleChange}
              rows={3}
              placeholder="Describe any previous injuries, surgeries, or ongoing physical issues..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="physicalLimitations"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Physical Limitations
            </label>
            <textarea
              id="physicalLimitations"
              name="physicalLimitations"
              value={formData.physicalLimitations}
              onChange={handleChange}
              rows={2}
              placeholder="Any physical limitations or restrictions we should know about..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="boxingExperience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Boxing Experience
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
              Other Combat Sports Experience
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
              Current Fitness Level
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
              Your Boxing Goals
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

      <div className="p-4 bg-gray-50 rounded-md">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="requiresPhysicianClearance"
            checked={formData.requiresPhysicianClearance}
            onChange={handleChange}
            className="mt-1 mr-3"
          />
          <span className="text-gray-700">
            I understand that I may be required to provide physician clearance
            before participating if I have indicated any serious medical
            conditions above.
          </span>
        </label>
      </div>
    </div>
  );
};

export default MedicalInfoStep;
