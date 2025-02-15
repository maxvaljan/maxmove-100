
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white shadow-sm rounded-lg p-8">
            {/* Header */}
            <header className="border-b border-gray-200 pb-8 mb-8">
              <h1 className="text-4xl font-bold text-maxmove-900">Privacy Policy of MaxMove</h1>
              <p className="mt-4 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </header>

            <div className="space-y-12">
              {/* 1. Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">1. Introduction</h2>
                <div className="prose prose-gray max-w-none space-y-4">
                  <p>
                    Welcome to MaxMove, your trusted platform for fast, efficient, and reliable logistics 
                    and delivery services. We are committed to protecting your personal data and ensuring 
                    that your privacy is respected in accordance with the applicable data protection laws, 
                    including the General Data Protection Regulation (GDPR) and the Federal Data Protection 
                    Act (BDSG) in Germany.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, store, and protect your personal data 
                    when you use our web app and related services. By accessing or using our services, you 
                    agree to the practices described in this Privacy Policy.
                  </p>
                </div>
              </section>

              {/* 2. Data Controller */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">2. Data Controller</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-semibold text-maxmove-900 mb-2">The data controller for MaxMove is:</p>
                  <address className="not-italic space-y-1 text-gray-700">
                    <p>MaxMove GmbH</p>
                    <p>[Your Address]</p>
                    <p>[City, Postal Code]</p>
                    <p>Germany</p>
                    <p>Email: [Your Contact Email]</p>
                    <p>Phone: [Your Contact Number]</p>
                  </address>
                </div>
              </section>

              {/* 3. Personal Data We Collect */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">3. Personal Data We Collect</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Account Information",
                      items: ["Name", "Email address", "Phone number", "Profile picture", "Password"]
                    },
                    {
                      title: "Payment Information",
                      items: ["Payment method details", "Credit card number", "Billing address", "Transaction history"]
                    },
                    {
                      title: "Location & Communication",
                      items: ["GPS location for pickup", "Drop-off points", "Messages with support", "Driver communications"]
                    },
                    {
                      title: "Technical Data",
                      items: ["Device type", "Browser info", "IP address", "Operating system", "Usage patterns"]
                    }
                  ].map((category) => (
                    <div key={category.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-maxmove-900 mb-2">{category.title}</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {category.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* 4. Purpose of Processing */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">4. Purpose of Processing Your Personal Data</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Service Delivery",
                      desc: "To provide the MaxMove platform, including logistics, delivery services, and connecting drivers with customers."
                    },
                    {
                      title: "Account Management",
                      desc: "To create and manage your account, handle your bookings, and communicate with you about your deliveries."
                    },
                    {
                      title: "Payment Processing",
                      desc: "To process payments, handle invoicing, and ensure secure transactions."
                    },
                    {
                      title: "Customer Support",
                      desc: "To respond to your inquiries, complaints, and provide customer service."
                    },
                    {
                      title: "Improvement of Services",
                      desc: "To analyze user behavior, improve app functionality, and enhance the user experience."
                    },
                    {
                      title: "Marketing and Promotions",
                      desc: "To send you promotional materials (if you opt-in), newsletters, and updates on new services or features."
                    },
                    {
                      title: "Legal Compliance",
                      desc: "To comply with legal obligations, including tax and accounting requirements, and to resolve disputes."
                    }
                  ].map((purpose) => (
                    <div key={purpose.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-maxmove-900 mb-2">{purpose.title}</h3>
                      <p className="text-gray-700">{purpose.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Legal Basis */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">5. Legal Basis for Data Processing</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Contractual Necessity",
                      desc: "Processing is necessary for the performance of a contract (e.g., delivery services)."
                    },
                    {
                      title: "Consent",
                      desc: "Processing based on your explicit consent for specific purposes like marketing."
                    },
                    {
                      title: "Legitimate Interests",
                      desc: "Processing based on our legitimate business interests for service improvement."
                    },
                    {
                      title: "Legal Obligation",
                      desc: "Processing required to comply with applicable laws and regulations."
                    }
                  ].map((basis) => (
                    <div key={basis.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-maxmove-900 mb-2">{basis.title}</h3>
                      <p className="text-gray-700">{basis.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6-13. Remaining Sections */}
              {[
                {
                  title: "6. Data Sharing and Transfers",
                  content: `We may share your personal data with third parties in specific circumstances:
                    • Service Providers: For payment processing, customer support, and technical infrastructure
                    • Business Partners: For service delivery and logistics operations
                    • Legal Compliance: When required by law or to protect rights
                    
                    For transfers outside the EEA, we implement appropriate safeguards including Standard Contractual Clauses.`
                },
                {
                  title: "7. Data Retention",
                  content: "We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including for legal, accounting, or reporting requirements. When your data is no longer needed, we will delete or anonymize it in accordance with applicable data retention policies."
                },
                {
                  title: "8. Your Rights",
                  content: `As a user in the European Union, you have the following rights:
                    • Right of Access
                    • Right to Rectification
                    • Right to Erasure
                    • Right to Restriction of Processing
                    • Right to Data Portability
                    • Right to Object
                    • Right to Withdraw Consent
                    
                    Contact us at [Your Contact Email] to exercise these rights.`
                },
                {
                  title: "9. Security of Your Data",
                  content: "We implement appropriate technical and organizational measures to protect your personal data, including encryption, firewalls, and secure storage. However, no method of transmission over the Internet is completely secure."
                },
                {
                  title: "10. Cookies and Tracking Technologies",
                  content: `We use cookies and similar technologies for:
                    • Essential functionality
                    • Analytics and performance
                    • Personalized advertising
                    
                    Manage preferences via browser settings or our cookie banner.`
                },
                {
                  title: "11. Third-Party Links",
                  content: "Our app may contain links to third-party websites. We are not responsible for their privacy practices. Review their policies before sharing personal data."
                },
                {
                  title: "12. Changes to This Privacy Policy",
                  content: "We may update this Privacy Policy periodically. Changes will be posted here with a revised date. Regular review is recommended."
                }
              ].map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">{section.title}</h2>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="prose prose-gray max-w-none">
                      <p className="whitespace-pre-line text-gray-700">{section.content}</p>
                    </div>
                  </div>
                </section>
              ))}

              {/* Contact Section */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">13. Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy 
                    or the processing of your personal data, please contact us at:
                  </p>
                  <address className="not-italic space-y-1 text-gray-700">
                    <p className="font-semibold">MaxMove GmbH</p>
                    <p>[Your Contact Information]</p>
                    <p>Email: [Your Contact Email]</p>
                    <p>Phone: [Your Contact Number]</p>
                  </address>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
