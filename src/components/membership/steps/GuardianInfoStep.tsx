import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";

const GuardianInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ guardianIdFile: file });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Guardian/Parent Information
        </h2>
        <p className="text-gray-600">
          Since the boxer is under 18, we require guardian/parent information
          and consent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="guardianFirstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Guardian First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="guardianFirstName"
            name="guardianFirstName"
            value={formData.guardianFirstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="guardianLastName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Guardian Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="guardianLastName"
            name="guardianLastName"
            value={formData.guardianLastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="guardianRelationship"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Relationship to Minor <span className="text-red-500">*</span>
          </label>
          <select
            id="guardianRelationship"
            name="guardianRelationship"
            value={formData.guardianRelationship}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          >
            <option value="">Select relationship</option>
            <option value="parent">Parent</option>
            <option value="legal-guardian">Legal Guardian</option>
            <option value="grandparent">Grandparent</option>
            <option value="other">Other (with legal authority)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="guardianEmail"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Guardian Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="guardianEmail"
            name="guardianEmail"
            value={formData.guardianEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="guardianPhone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Guardian Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="guardianPhone"
            name="guardianPhone"
            value={formData.guardianPhone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Guardian Address (if different from minor)
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="guardianAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Street Address
            </label>
            <input
              type="text"
              id="guardianAddress"
              name="guardianAddress"
              value={formData.guardianAddress}
              onChange={handleChange}
              placeholder="Leave blank if same as minor's address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="guardianCity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="guardianCity"
                name="guardianCity"
                value={formData.guardianCity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="guardianState"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                State
              </label>
              <select
                id="guardianState"
                name="guardianState"
                value={formData.guardianState}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="UT">Utah</option>
                <option value="ID">Idaho</option>
                <option value="WY">Wyoming</option>
                <option value="CO">Colorado</option>
                <option value="NV">Nevada</option>
                <option value="AZ">Arizona</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="guardianZipCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="guardianZipCode"
                name="guardianZipCode"
                value={formData.guardianZipCode}
                onChange={handleChange}
                pattern="[0-9]{5}"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Guardian Photo ID
        </h3>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md mb-4">
          <p className="text-sm text-amber-800">
            <strong>Required:</strong> Please upload a photo of the
            guardian&#39;s valid government-issued ID (driver&#39;s license,
            passport, or state ID).
          </p>
        </div>
        <div>
          <label
            htmlFor="guardianIdFile"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Guardian ID <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="guardianIdFile"
            name="guardianIdFile"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Accepted formats: JPG, PNG, PDF (max 10MB)
          </p>
          {formData.guardianIdFile && (
            <p className="mt-2 text-sm text-green-600">
              ✓ File uploaded: {formData.guardianIdFile.name}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuardianInfoStep;
