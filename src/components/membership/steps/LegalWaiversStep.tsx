import { PersonalInfoStepProps } from "@/components/membership/steps/PersonalInfoStep";
import { FormData } from "@/components/membership/types/membershipTypes";

const LegalWaiversStep: React.FC<PersonalInfoStepProps> = ({
  formData,
  updateFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
  };

  const agreements = [
    {
      name: "agreeToLiabilityWaiver",
      title: "Liability Waiver and Release of Claims",
      content: `I acknowledge that boxing and physical training involve inherent risks including but not limited to serious injury, disability, and death. I voluntarily assume all risks and release BoxFit Utah, its owners, employees, and agents from any and all liability for injuries or damages that may occur during or as a result of my participation in activities at BoxFit Utah.`,
    },
    {
      name: "agreeToAssumptionOfRisk",
      title: "Assumption of Risk for Combat Sports",
      content: `I understand that boxing is a combat sport that involves physical contact and carries specific risks including concussions, broken bones, cuts, and other injuries. I acknowledge these risks and voluntarily choose to participate. I understand that protective equipment reduces but does not eliminate these risks.`,
    },
    {
      name: "agreeToMembershipTerms",
      title: "Membership Terms and Conditions",
      content: `I agree to the membership terms including payment obligations, facility rules, and code of conduct. I understand that membership fees are non-refundable and that I must provide 30 days written notice before the 1st of the month to cancel my membership.`,
    },
    {
      name: "agreeToPaymentTerms",
      title: "Payment Terms and Cancellation Policy",
      content: `I authorize BoxFit Utah to charge my payment method ${formData.membershipPlan === "2-day" ? "$75" : "$100"} monthly on the 2nd of each month. I understand that I must provide 30 days notice before the 1st of the month to cancel, and that the notice period constitutes one full billing cycle.`,
    },
    {
      name: "agreeToGymRules",
      title: "Gym Rules and Safety Protocols",
      content: `I agree to follow all gym rules including: respecting equipment, following coach instructions, and treating all members and staff with respect. I understand that violation of gym rules may result in membership termination.`,
    },
    {
      name: "agreeToCodeOfConduct",
      title: "Code of Conduct Agreement",
      content: `I agree to maintain appropriate behavior including: no harassment or discrimination, no aggressive behavior outside of supervised training, no use of prohibited substances, and maintaining a positive training environment for all members.`,
    },
    {
      name: "agreeToEquipmentGuidelines",
      title: "Equipment Usage Guidelines",
      content: `I agree to use all equipment properly and safely, report any damaged equipment immediately, and understand that I am responsible for any damage caused by misuse. I will follow all equipment cleaning protocols.`,
    },
    {
      name: "agreeToPhotoRelease",
      title: "Photo/Video Release (Optional)",
      content: `I grant BoxFit Utah permission to use photographs or videos of me taken during training for promotional purposes including social media, website, and marketing materials. This agreement is optional and does not affect membership eligibility.`,
      optional: true,
    },
    {
      name: "agreeToCancellationPolicy",
      title: "Cancellation Policy Acknowledgment",
      content: `I understand that to cancel my membership, I must provide written notice (email or written letter) 30 days before the 1st of the month. Cancellations received after the 1st will be effective the following month. No refunds will be provided for partial months.`,
    },
  ];

  const allRequiredChecked = agreements
    .filter((a) => !a.optional)
    .every((a) => formData[a.name as keyof FormData] as boolean);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Legal Agreements and Waivers
        </h2>
        <p className="text-gray-600">
          Please read and accept all required agreements to proceed with your
          membership.
        </p>
        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">
            <strong>Important:</strong> These legal agreements are binding.
            Please read each carefully before accepting.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {agreements.map((agreement) => (
          <div
            key={agreement.name}
            className="border border-gray-200 rounded-lg p-4"
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {agreement.title}{" "}
              {!agreement.optional && <span className="text-red-500">*</span>}
            </h3>
            <div className="mb-3 p-3 bg-gray-50 rounded text-sm text-gray-700 max-h-32 overflow-y-auto">
              {agreement.content}
            </div>
            <label className="flex items-start">
              <input
                type="checkbox"
                name={agreement.name}
                checked={formData[agreement.name as keyof FormData] as boolean}
                onChange={handleChange}
                className="mt-1 mr-3"
              />
              <span className="text-gray-700">
                I have read and agree to the {agreement.title.toLowerCase()}
                {agreement.optional && " (optional)"}
              </span>
            </label>
          </div>
        ))}
      </div>

      {!allRequiredChecked && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            You must accept all required agreements to continue with your
            membership application.
          </p>
        </div>
      )}
    </div>
  );
};

export default LegalWaiversStep;
