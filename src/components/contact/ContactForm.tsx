import ContactFormClient from "./ContactFormClient";

const ContactForm = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-card shadow-card">
      <h2 className="font-accent text-3xl mb-6 text-boxing-black">
        SEND US A <span className="text-boxing-red">MESSAGE</span>
      </h2>
      <p className="mb-6 text-caption-text">
        Fill out the form below and we&#39;ll get back to you as soon as
        possible. Whether you&#39;re interested in membership information, class
        schedules, or have general questions, we&#39;re here to help!
      </p>
      <ContactFormClient />
    </div>
  );
};

export default ContactForm;
