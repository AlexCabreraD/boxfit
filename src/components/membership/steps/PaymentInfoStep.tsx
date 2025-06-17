import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";

const PaymentInfoStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const membershipPrice = formData.membershipPlan === "2-day" ? "$75" : "$100";
  const membershipName =
    formData.membershipPlan === "2-day" ? "2-Day Access" : "4-Day Access";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Membership Selection & Payment Information
        </h2>
        <p className="text-gray-600">
          Confirm your membership plan and provide payment details for monthly
          billing.
        </p>
      </div>

      {/* Selected Membership Plan Display */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Selected Membership Plan
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-lg">{membershipName}</h4>
            <p className="text-green-700">
              {formData.membershipPlan === "2-day"
                ? "2 days per week access with basic equipment and coaching"
                : "4 days per week access with enhanced training opportunities"}
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-800">
              {membershipPrice}
            </span>
            <span className="text-green-600 ml-1">/month</span>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Billing Information
        </h3>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-4">
          <p className="text-sm text-blue-800">
            <strong>Monthly Billing:</strong> Your card will be charged{" "}
            {membershipPrice} on the 2nd of each month. To cancel, you must
            provide 30 days written notice before the 1st of the month.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Desired Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div>
            <label
              htmlFor="cardholderName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Cardholder Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="As it appears on card"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="p-4 bg-gray-100 rounded-md">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Payment Processing:</strong> After submitting this form,
              our team will contact you within 24 hours to securely process your
              payment information and finalize your membership setup.
            </p>
          </div>

          <div>
            <label
              htmlFor="billingAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Billing Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              placeholder="Street address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="billingCity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="billingCity"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="billingState"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                State <span className="text-red-500">*</span>
              </label>
              <select
                id="billingState"
                name="billingState"
                value={formData.billingState}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
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
                htmlFor="billingZipCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="billingZipCode"
                name="billingZipCode"
                value={formData.billingZipCode}
                onChange={handleChange}
                pattern="[0-9]{5}"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Membership Summary
        </h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Selected Plan:</span>
            <span className="font-semibold">{membershipName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Monthly Fee:</span>
            <span className="font-semibold">{membershipPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Billing Date:</span>
            <span className="font-semibold">2nd of each month</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cancellation Notice:</span>
            <span className="font-semibold">30 days before the 1st</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoStep;
