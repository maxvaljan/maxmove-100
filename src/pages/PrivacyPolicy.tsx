
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white shadow-sm rounded-lg p-8">
            <header className="mb-12">
              <h1 className="text-4xl font-bold text-maxmove-900 mb-4">Privacy Policy of MaxMove</h1>
              <p className="text-gray-600">Last updated: March 20, 2024</p>
            </header>

            <div className="prose prose-gray max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900">1. Introduction</h2>
                <p className="mt-4">
                  Welcome to MaxMove, your trusted platform for fast, efficient, and reliable logistics and delivery services. We are committed to protecting your personal data and ensuring that your privacy is respected in accordance with the applicable data protection laws, including the General Data Protection Regulation (GDPR) and the Federal Data Protection Act (BDSG) in Germany.
                </p>
                <p className="mt-4">
                  This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our web app and related services. By accessing or using our services, you agree to the practices described in this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900">2. Data Controller</h2>
                <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-medium mb-4">The data controller for MaxMove is:</p>
                  <div className="space-y-1">
                    <p>MaxMove GmbH</p>
                    <p>[Your Address]</p>
                    <p>[City, Postal Code]</p>
                    <p>Germany</p>
                    <p>Email: [Your Contact Email]</p>
                    <p>Phone: [Your Contact Number]</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900">3. Personal Data We Collect</h2>
                <p className="mt-4 mb-6">We collect the following types of personal data when you use our services:</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Account Information</h3>
                    <p>Name, email address, phone number, profile picture, and password.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Payment Information</h3>
                    <p>Payment method details, billing address, transaction history.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Location Data</h3>
                    <p>GPS location for pickup and drop-off points.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Device Information</h3>
                    <p>Device type, browser, IP address, operating system.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900">4. Purpose of Processing Your Personal Data</h2>
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Service Delivery</h3>
                    <p>To provide the MaxMove platform, including logistics, delivery services, and connecting drivers and customers.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Account Management</h3>
                    <p>To create and manage your account, handle your bookings, and communicate with you about your deliveries.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-2">Payment Processing</h3>
                    <p>To process payments, handle invoicing, and ensure secure transactions.</p>
                  </div>
                </div>
              </section>

              {/* Sections 5-13 */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900">13. Contact Us</h2>
                <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="mb-4">If you have any questions, concerns, or requests regarding this Privacy Policy or the processing of your personal data, please contact us at:</p>
                  <div className="space-y-1">
                    <p className="font-medium">MaxMove GmbH</p>
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
