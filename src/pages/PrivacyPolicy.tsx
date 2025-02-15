import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const PrivacyPolicy = () => {
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-maxmove-900 mb-8">

Privacy Policy of Maxmove</h1>
            
            <div className="prose prose-maxmove">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>1. Introduction</h2>
              <p>
                Welcome to Maxmove's Privacy Policy. This document outlines how we collect, use, 
                and protect your personal information when you use our services.
              </p>

              <h2>2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including but not limited to:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Location data for delivery services</li>
                <li>Payment information</li>
                <li>Device and usage information</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>
                We use the collected information to:
              </p>
              <ul>
                <li>Provide and improve our services</li>
                <li>Process your transactions</li>
                <li>Send you updates and notifications</li>
                <li>Ensure platform security</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default PrivacyPolicy;