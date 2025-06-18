import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";
import { FormData } from "@/components/membership/types/membershipTypes";

const MedicalInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
  onSkip,
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

  const handleNoMedicalHistory = () => {
    updateFormData({
      hasHeartCondition: false,
      hasSeizureDisorder: false,
      hasHeadInjuries: false,
      hasBreathingProblems: false,
      hasDiabetes: false,
      hasHighBloodPressure: false,
      otherMedicalConditions: "",
      currentMedications: "",
      allergies: "",
      previousInjuries: "",
      physicalLimitations: "",
    });
    if (onSkip) {
      onSkip();
    }
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
          Medical Information & Health History Medical Information & Health
          History
        </h2>
        <p className="text-gray-600">
          This information helps us ensure your safety during training. All
          information is kept confidential.
        </p>
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Coach Pablo will review your medical history
            and contact you if any physician clearance is needed before starting
            training.
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleNoMedicalHistory}
          className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
        >
          ✅ No Relevant Medical History - Skip Section
        </button>
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
          Physical History
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
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-700">
          <strong>Important:</strong> This information helps us provide safe and
          effective training. Coach Pablo will review all medical information
          and may request physician clearance for certain conditions before
          training begins.
        </p>
      </div>
    </div>
  );
};

export default MedicalInfoStep;
