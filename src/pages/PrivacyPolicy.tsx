
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  // Company information object for easy editing
  const companyInfo = {
    name: "MaxMove GmbH",
    address: {
      street: "[Your Address]",
      city: "[City]",
      postalCode: "[Postal Code]",
      country: "Germany"
    },
    contact: {
      email: "contact@maxmove.de",
      phone: "+49 [Your Phone Number]"
    },
    lastUpdated: new Date().toLocaleDateString()
  };

  // Content sections for easy management
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: [
        "Welcome to MaxMove, your trusted platform for fast, efficient, and reliable logistics and delivery services. We are committed to protecting your personal data and ensuring that your privacy is respected in accordance with the applicable data protection laws, including the General Data Protection Regulation (GDPR) and the Federal Data Protection Act (BDSG) in Germany.",
        "This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our web app and related services. By accessing or using our services, you agree to the practices described in this Privacy Policy."
      ]
    },
    {
      id: "dataCollection",
      title: "3. Personal Data We Collect",
      categories: [
        {
          title: "Account Information",
          items: [
            "Name",
            "Email address",
            "Phone number",
            "Profile picture",
            "Password"
          ]
        },
        {
          title: "Payment Information",
          items: [
            "Payment method details",
            "Billing address",
            "Transaction history"
          ]
        },
        {
          title: "Location Data",
          items: [
            "GPS location for pickup",
            "Drop-off points",
            "Route information"
          ]
        },
        {
          title: "Usage Information",
          items: [
            "Time spent on app",
            "Search queries",
            "Click patterns",
            "Device type and OS"
          ]
        }
      ]
    },
    {
      id: "dataProcessing",
      title: "4. Purpose of Processing",
      purposes: [
        {
          title: "Service Delivery",
          description: "To provide logistics and delivery services, connecting drivers with customers"
        },
        {
          title: "Account Management",
          description: "To create and manage accounts, handle bookings and communications"
        },
        {
          title: "Payment Processing",
          description: "To process payments, invoicing, and ensure secure transactions"
        },
        {
          title: "Service Improvement",
          description: "To analyze user behavior and enhance platform functionality"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white shadow-sm rounded-lg p-8">
            {/* Header Section */}
            <header className="border-b border-gray-200 pb-8 mb-8">
              <h1 className="text-4xl font-bold text-maxmove-900">Privacy Policy of MaxMove</h1>
              <p className="mt-4 text-gray-600">Last updated: {companyInfo.lastUpdated}</p>
            </header>

            <div className="space-y-12">
              {/* Data Controller Section */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">2. Data Controller</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="font-semibold text-maxmove-900 mb-2">The data controller for MaxMove is:</p>
                  <address className="not-italic space-y-1 text-gray-700">
                    <p>{companyInfo.name}</p>
                    <p>{companyInfo.address.street}</p>
                    <p>{companyInfo.address.city}, {companyInfo.address.postalCode}</p>
                    <p>{companyInfo.address.country}</p>
                    <p>Email: {companyInfo.contact.email}</p>
                    <p>Phone: {companyInfo.contact.phone}</p>
                  </address>
                </div>
              </section>

              {/* Dynamic Sections */}
              {sections.map((section) => (
                <section key={section.id}>
                  <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">{section.title}</h2>
                  
                  {section.content && (
                    <div className="prose max-w-none text-gray-700 space-y-4">
                      {section.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {section.categories && (
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      {section.categories.map((category) => (
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
                  )}

                  {section.purposes && (
                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      {section.purposes.map((purpose) => (
                        <div key={purpose.title} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h3 className="font-semibold text-maxmove-900 mb-2">{purpose.title}</h3>
                          <p className="text-gray-700">{purpose.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Contact Section */}
              <section>
                <h2 className="text-2xl font-semibold text-maxmove-900 mb-4">Contact Us</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700 mb-4">
                    If you have any questions, concerns, or requests regarding this Privacy Policy 
                    or the processing of your personal data, please contact us at:
                  </p>
                  <address className="not-italic space-y-1 text-gray-700">
                    <p className="font-semibold">{companyInfo.name}</p>
                    <p>Email: {companyInfo.contact.email}</p>
                    <p>Phone: {companyInfo.contact.phone}</p>
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
