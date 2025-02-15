import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PrivacyHeader } from "@/components/privacy/PrivacyHeader";
import { PrivacySection } from "@/components/privacy/PrivacySection";
import { DataController } from "@/components/privacy/DataController";
import { PersonalDataGrid } from "@/components/privacy/PersonalDataGrid";
import { ContactSection } from "@/components/privacy/ContactSection";

const PrivacyPolicy = () => {
  const personalDataCategories = [
    {
      title: "Account Information",
      items: ["Name", "Email address", "Phone number", "Profile picture", "Password"]
    },
    {
      title: "Payment Information",
      items: ["Payment method details", "Billing address", "Transaction history"]
    },
    {
      title: "Location Data",
      items: ["GPS location for pickup", "Drop-off points", "Route information"]
    },
    {
      title: "Technical Data",
      items: ["Device type", "Browser info", "IP address", "Operating system", "Usage patterns"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white shadow-sm rounded-lg p-8">
            <PrivacyHeader />

            <div className="space-y-12">
              <PrivacySection title="1. Introduction">
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
              </PrivacySection>

              <PrivacySection title="2. Data Controller">
                <DataController />
              </PrivacySection>

              <PrivacySection title="3. Personal Data We Collect">
                <PersonalDataGrid categories={personalDataCategories} />
              </PrivacySection>

              <PrivacySection title="4. Purpose of Processing">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Service Delivery</h3>
                    <p className="text-gray-700">To provide the MaxMove platform, including logistics, delivery services, and connecting drivers with customers.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Account Management</h3>
                    <p className="text-gray-700">To create and manage your account, handle your bookings, and communicate with you about your deliveries.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Payment Processing</h3>
                    <p className="text-gray-700">To process payments, handle invoicing, and ensure secure transactions.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Customer Support</h3>
                    <p className="text-gray-700">To respond to your inquiries, complaints, and provide customer service.</p>
                  </div>
                </div>
              </PrivacySection>

              <PrivacySection title="5. Legal Basis">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Contractual Necessity</h3>
                    <p className="text-gray-700">Processing is necessary for the performance of a contract (e.g., delivery services).</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Consent</h3>
                    <p className="text-gray-700">Processing based on your explicit consent for specific purposes like marketing.</p>
                  </div>
                </div>
              </PrivacySection>

              <PrivacySection title="6. Data Sharing and Transfers">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line">
                    We may share your personal data with third parties in specific circumstances:
                    • Service Providers: For payment processing, customer support, and technical infrastructure
                    • Business Partners: For service delivery and logistics operations
                    • Legal Compliance: When required by law or to protect rights
                    
                    For transfers outside the EEA, we implement appropriate safeguards including Standard Contractual Clauses.
                  </p>
                </div>
              </PrivacySection>

              <PrivacySection title="7. Data Retention">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                    including for legal, accounting, or reporting requirements. When your data is no longer needed, we will delete or 
                    anonymize it in accordance with applicable data retention policies.
                  </p>
                </div>
              </PrivacySection>

              <PrivacySection title="8. Your Rights">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">As a user in the European Union, you have the following rights:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Right of Access</li>
                    <li>Right to Rectification</li>
                    <li>Right to Erasure</li>
                    <li>Right to Restriction of Processing</li>
                    <li>Right to Data Portability</li>
                    <li>Right to Object</li>
                    <li>Right to Withdraw Consent</li>
                  </ul>
                  <p className="mt-4 text-gray-700">Contact us at [Your Contact Email] to exercise these rights.</p>
                </div>
              </PrivacySection>

              <PrivacySection title="9. Security of Your Data">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    We implement appropriate technical and organizational measures to protect your personal data, 
                    including encryption, firewalls, and secure storage. However, no method of transmission over 
                    the Internet is completely secure.
                  </p>
                </div>
              </PrivacySection>

              <PrivacySection title="10. Cookies and Tracking">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">We use cookies and similar technologies for:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Essential functionality</li>
                    <li>Analytics and performance</li>
                    <li>Personalized advertising</li>
                  </ul>
                  <p className="mt-4 text-gray-700">
                    Manage preferences via browser settings or our cookie banner.
                  </p>
                </div>
              </PrivacySection>

              <PrivacySection title="11. Third-Party Links">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    Our app may contain links to third-party websites. We are not responsible for their 
                    privacy practices. Review their policies before sharing personal data.
                  </p>
                </div>
              </PrivacySection>

              <PrivacySection title="12. Changes to Privacy Policy">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    We may update this Privacy Policy periodically. Changes will be posted here with a 
                    revised date. Regular review is recommended.
                  </p>
                </div>
              </PrivacySection>

              <PrivacySection title="13. Contact Us">
                <ContactSection />
              </PrivacySection>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
