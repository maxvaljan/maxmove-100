
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  const address = {
    street: "[Your Address]",
    city: "[City]",
    postalCode: "[Postal Code]",
    country: "Germany",
    email: "contact@maxmove.de",
    phone: "+49 [Your Phone Number]"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white shadow-sm rounded-lg p-8">
            {/* Header Section */}
            <header className="border-b border-gray-200 pb-8 mb-8">
              <h1 className="text-4xl font-bold text-maxmove-900">Privacy Policy of MaxMove</h1>
              <p className="mt-4 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </header>

            <div className="space-y-12">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">1. Introduction</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4">
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
                  <address className="not-italic space-y-1 text-gray-700">
                    <p>MaxMove GmbH</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.postalCode}</p>
                    <p>{address.country}</p>
                    <p>Email: {address.email}</p>
                    <p>Phone: {address.phone}</p>
                  </address>
                </div>
              </section>

              {/* Personal Data Collection */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">3. Personal Data We Collect</h2>
                <div className="space-y-4">
                  <p className="text-gray-700">We collect the following types of personal data when you use our services:</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
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
                        title: "Device & Usage Information",
                        items: ["Device type", "Browser info", "IP address", "Operating system"]
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
                </div>
              </section>

              {/* Data Processing Purpose */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">4. Purpose of Processing</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Service Delivery",
                      description: "Providing logistics, delivery services, and connecting drivers with customers"
                    },
                    {
                      title: "Account Management",
                      description: "Creating and managing accounts, handling bookings and communications"
                    },
                    {
                      title: "Payment Processing",
                      description: "Processing payments, invoicing, and ensuring secure transactions"
                    },
                    {
                      title: "Service Improvement",
                      description: "Analyzing user behavior and enhancing platform functionality"
                    }
                  ].map((purpose) => (
                    <div key={purpose.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-maxmove-900 mb-2">{purpose.title}</h3>
                      <p className="text-gray-700">{purpose.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">5. Your Rights</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      right: "Right of Access",
                      description: "Request a copy of your personal data"
                    },
                    {
                      right: "Right to Rectification",
                      description: "Correct inaccurate or incomplete data"
                    },
                    {
                      right: "Right to Erasure",
                      description: "Request deletion of your personal data"
                    },
                    {
                      right: "Right to Data Portability",
                      description: "Receive and transfer your data"
                    }
                  ].map((right) => (
                    <div key={right.right} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-maxmove-900 mb-2">{right.right}</h3>
                      <p className="text-gray-700">{right.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">6. Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy 
                    or the processing of your personal data, please contact us at:
                  </p>
                  <address className="not-italic space-y-1 text-gray-700">
                    <p className="font-semibold">MaxMove GmbH</p>
                    <p>Email: {address.email}</p>
                    <p>Phone: {address.phone}</p>
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
