
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-maxmove-900 mb-8">Privacy Policy of MaxMove</h1>
          
          <div className="prose prose-maxmove max-w-none space-y-8">
            <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">1. Introduction</h2>
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
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">2. Data Controller</h2>
              <p>The data controller for MaxMove is:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>MaxMove GmbH</p>
                <p>[Your Address]</p>
                <p>[City, Postal Code]</p>
                <p>Germany</p>
                <p>Email: [Your Contact Email]</p>
                <p>Phone: [Your Contact Number]</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">3. Personal Data We Collect</h2>
              <p>We collect the following types of personal data when you use our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> Name, email address, phone number, profile picture, and password.</li>
                <li><strong>Payment Information:</strong> Payment method details (e.g., credit card number, billing address), transaction history.</li>
                <li><strong>Location Data:</strong> GPS location for pickup and drop-off points to facilitate logistics and deliveries.</li>
                <li><strong>Communication Data:</strong> Messages exchanged between users and our support team or drivers.</li>
                <li><strong>Device Information:</strong> Information about the device you use to access our service.</li>
                <li><strong>Usage Data:</strong> Information on how you use our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">4. Purpose of Processing Your Personal Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Delivery:</strong> To provide the MaxMove platform, including logistics and delivery services.</li>
                <li><strong>Account Management:</strong> To create and manage your account and handle bookings.</li>
                <li><strong>Payment Processing:</strong> To process payments and handle invoicing.</li>
                <li><strong>Customer Support:</strong> To respond to inquiries and provide service.</li>
                <li><strong>Improvement of Services:</strong> To analyze user behavior and enhance experience.</li>
                <li><strong>Marketing and Promotions:</strong> To send promotional materials (with opt-in).</li>
                <li><strong>Legal Compliance:</strong> To comply with legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">5. Legal Basis for Data Processing</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contractual Necessity:</strong> Processing necessary for service delivery.</li>
                <li><strong>Consent:</strong> Processing based on your explicit consent.</li>
                <li><strong>Legitimate Interests:</strong> Processing based on our legitimate business interests.</li>
                <li><strong>Legal Obligation:</strong> Processing required by applicable laws.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">6. Data Sharing and Transfers</h2>
              <p>We may share your personal data with third parties in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Third-party providers assisting with our services.</li>
                <li><strong>Business Partners:</strong> Partners involved in service delivery.</li>
                <li><strong>Legal Compliance:</strong> When required by law or to protect rights.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">7. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right of Access</li>
                <li>Right to Rectification</li>
                <li>Right to Erasure</li>
                <li>Right to Restriction of Processing</li>
                <li>Right to Data Portability</li>
                <li>Right to Object</li>
                <li>Right to Withdraw Consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p>MaxMove GmbH</p>
                <p>Email: [Your Contact Email]</p>
                <p>Phone: [Your Contact Number]</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
