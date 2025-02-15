
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy of MaxMove</h1>
          <p className="mb-8">Last updated: March 20, 2024</p>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
            <p className="mb-4">Welcome to MaxMove, your trusted platform for fast, efficient, and reliable logistics and delivery services. We are committed to protecting your personal data and ensuring that your privacy is respected in accordance with the applicable data protection laws, including the General Data Protection Regulation (GDPR) and the Federal Data Protection Act (BDSG) in Germany.</p>
            <p>This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our web app and related services. By accessing or using our services, you agree to the practices described in this Privacy Policy.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Data Controller</h2>
            <p>The data controller for MaxMove is:</p>
            <p>MaxMove GmbH<br />
            Eulenbergstr.37<br />
            51065 Köln<br />
            Germany<br />
            Email: contact@maxmove.com<br />
            Phone: +49 173 4224371</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">3. Personal Data We Collect</h2>
            <p>We collect the following types of personal data when you use our services:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Account Information: Name, email address, phone number, profile picture, and password.</li>
              <li>Payment Information: Payment method details (e.g., credit card number, billing address), transaction history.</li>
              <li>Location Data: GPS location for pickup and drop-off points to facilitate logistics and deliveries.</li>
              <li>Communication Data: Messages exchanged between users and our support team or drivers.</li>
              <li>Device Information: Information about the device you use to access our service, such as device type, browser, IP address, and operating system.</li>
              <li>Usage Data: Information on how you use our platform, such as time spent on the app, search queries, click patterns, and browsing activity.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">4. Purpose of Processing Your Personal Data</h2>
            <p>We process your personal data for the following purposes:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Service Delivery: To provide the MaxMove platform, including logistics, delivery services, and connecting drivers and customers.</li>
              <li>Account Management: To create and manage your account, handle your bookings, and communicate with you about your deliveries.</li>
              <li>Payment Processing: To process payments, handle invoicing, and ensure secure transactions.</li>
              <li>Customer Support: To respond to your inquiries, complaints, and provide customer service.</li>
              <li>Improvement of Services: To analyze user behavior, improve app functionality, and enhance the user experience.</li>
              <li>Marketing and Promotions: To send you promotional materials (if you opt-in), newsletters, and updates on new services or features.</li>
              <li>Legal Compliance: To comply with legal obligations, including tax and accounting requirements, and to resolve disputes.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">5. Legal Basis for Data Processing</h2>
            <p>We process your personal data based on the following legal grounds:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Contractual Necessity: Processing is necessary for the performance of a contract (e.g., delivery services).</li>
              <li>Consent: We may process your data based on your consent, for example, for marketing purposes or specific preferences.</li>
              <li>Legitimate Interests: We may process your data based on our legitimate interests, such as improving services and security, unless your rights override those interests.</li>
              <li>Legal Obligation: Processing may be required to comply with applicable laws and regulations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">6. Data Sharing and Transfers</h2>
            <p>We may share your personal data with third parties in the following circumstances:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Service Providers: We may share your data with third-party service providers that assist us with payment processing, customer support, data analytics, and technical infrastructure.</li>
              <li>Business Partners: If you use our platform in conjunction with third-party partners (e.g., drivers, delivery service partners), we may share necessary data for the completion of the service.</li>
              <li>Legal Compliance: We may disclose your data when required by law, such as to comply with a legal process or when necessary to protect the rights, property, or safety of MaxMove, its users, or others.</li>
            </ul>
            <p>If any data transfers occur outside of the European Economic Area (EEA), we ensure that appropriate safeguards are in place to protect your data, such as using Standard Contractual Clauses.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">7. Data Retention</h2>
            <p>We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, including for legal, accounting, or reporting requirements. When your data is no longer needed, we will delete or anonymize it in accordance with applicable data retention policies.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">8. Your Rights</h2>
            <p>As a user in the European Union, you have the following rights regarding your personal data:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Right of Access: You can request a copy of the personal data we hold about you.</li>
              <li>Right to Rectification: You can request the correction of inaccurate or incomplete data.</li>
              <li>Right to Erasure: You can request the deletion of your personal data, subject to certain conditions (e.g., if the data is no longer needed for the purposes it was collected).</li>
              <li>Right to Restriction of Processing: You can request the restriction of processing of your personal data under certain circumstances.</li>
              <li>Right to Data Portability: You can request a copy of your data in a structured, commonly used format for transfer to another service.</li>
              <li>Right to Object: You can object to the processing of your personal data for certain purposes, including direct marketing.</li>
              <li>Right to Withdraw Consent: If you have provided consent for data processing, you can withdraw it at any time.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at contact@maxmove.com.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">9. Security of Your Data</h2>
            <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, and destruction. These measures include encryption, firewalls, and secure data storage practices.</p>
            <p>However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">10. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to collect usage data, enhance user experience, and improve the performance of our app. These include:</p>
            <ul className="list-disc pl-8 mb-4">
              <li>Essential Cookies: Necessary for the functionality of the website and app.</li>
              <li>Analytical Cookies: Used to collect information about how users interact with our service to improve its performance.</li>
              <li>Advertising Cookies: Used to deliver personalized ads based on your interests.</li>
            </ul>
            <p>You can manage cookie preferences in your browser settings or through the cookie consent banner in our app.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">11. Third-Party Links</h2>
            <p>Our app may contain links to third-party websites or services. We are not responsible for the privacy practices or content of such third parties. We encourage you to review their privacy policies before providing them with any personal data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. When we make changes, we will post the updated version on this page with a revised "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">13. Contact Us</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or the processing of your personal data, please contact us at:</p>
            <p>MaxMove GmbH<br />
            Eulenbergstr.37<br />
            51065 Köln<br />
            Email: contact@maxmove.com<br />
            Phone: +49 173 4224371</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
