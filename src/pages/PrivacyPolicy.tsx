
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
              <p className="mt-4 text-gray-600">Last updated: March 20, 2024</p>
            </header>

            <div className="space-y-12">
              {/* Introduction */}
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

              {/* Data Controller */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">2. Data Controller</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-semibold text-maxmove-900 mb-2">The data controller for MaxMove is:</p>
                  <div className="space-y-1 text-gray-700">
                    <p>MaxMove GmbH</p>
                    <p>[Your Address]</p>
                    <p>[City, Postal Code]</p>
                    <p>Germany</p>
                    <p>Email: [Your Contact Email]</p>
                    <p>Phone: [Your Contact Number]</p>
                  </div>
                </div>
              </section>

              {/* Personal Data Collection */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">3. Personal Data We Collect</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Account Information</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Phone number</li>
                      <li>Profile picture</li>
                      <li>Password</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Payment Information</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Payment method details</li>
                      <li>Billing address</li>
                      <li>Transaction history</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Location Data</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>GPS location for pickup</li>
                      <li>Drop-off points</li>
                      <li>Route information</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-maxmove-900 mb-2">Technical Data</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Device type</li>
                      <li>Browser info</li>
                      <li>IP address</li>
                      <li>Operating system</li>
                      <li>Usage patterns</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Purpose of Processing */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">4. Purpose of Processing</h2>
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
              </section>

              {/* Legal Basis */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">5. Legal Basis</h2>
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
              </section>

              {/* Remaining Sections */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">6. Data Sharing and Transfers</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-line">
                    We may share your personal data with third parties in specific circumstances:
                    • Service Providers: For payment processing, customer support, and technical infrastructure
                    • Business Partners: For service delivery and logistics operations
                    • Legal Compliance: When required by law or to protect rights
                    
                    For transfers outside the EEA, we implement appropriate safeguards including Standard Contractual Clauses.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">7. Data Retention</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                    including for legal, accounting, or reporting requirements. When your data is no longer needed, we will delete or 
                    anonymize it in accordance with applicable data retention policies.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">8. Your Rights</h2>
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
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">9. Security of Your Data</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    We implement appropriate technical and organizational measures to protect your personal data, 
                    including encryption, firewalls, and secure storage. However, no method of transmission over 
                    the Internet is completely secure.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">10. Cookies and Tracking</h2>
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
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">11. Third-Party Links</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    Our app may contain links to third-party websites. We are not responsible for their 
                    privacy practices. Review their policies before sharing personal data.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">12. Changes to Privacy Policy</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    We may update this Privacy Policy periodically. Changes will be posted here with a 
                    revised date. Regular review is recommended.
                  </p>
                </div>
              </section>

              {/* Contact Section */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">13. Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="space-y-1 text-gray-700">
                    <p className="font-semibold">MaxMove GmbH</p>
                    <p>[Your Contact Information]</p>
                    <p>Email: [Your Contact Email]</p>
                    <p>Phone: [Your Contact Number]</p>
                  </div>
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
