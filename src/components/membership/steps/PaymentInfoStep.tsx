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
          Membership Selection & Payment Setup
        </h2>
        <p className="text-gray-600">
          Confirm your membership plan and provide information for payment setup
          after your free trial.
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

      {/* Payment Setup Information */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Setup Information
        </h3>
        <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
          <p className="text-sm text-green-800">
            <strong>No Immediate Charges:</strong> You will not be charged until
            after completing your free trial class. If you decide to continue,
            billing begins with your second class and continues monthly
            thereafter.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Desired Start Date (for your free trial)
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
              Full Name (as it will appear on billing){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="Full name for billing"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800 mb-2">
              <strong>Payment Setup:</strong> After submitting this form,
              you&#39;ll receive a secure payment link to set up your membership
              billing. You will not be charged until after your free trial
              class, and you can cancel anytime if you decide BoxFit isn&#39;t
              the right fit for you.
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
            <span className="text-gray-600">Free Trial:</span>
            <span className="font-semibold">First class is FREE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">
              Monthly Fee (starts after trial):
            </span>
            <span className="font-semibold">{membershipPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Billing Starts:</span>
            <span className="font-semibold">After your second class</span>
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
