import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-maxmove-900 mb-8">Cookie Policy</h1>
            
            <div className="prose prose-maxmove">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website.
                They help us provide you with a better experience by remembering your preferences and
                understanding how you use our services.
              </p>

              <h2>2. How We Use Cookies</h2>
              <p>
                We use cookies for the following purposes:
              </p>
              <ul>
                <li>Essential cookies for site functionality</li>
                <li>Analytics cookies to improve our service</li>
                <li>Preference cookies to remember your settings</li>
                <li>Authentication cookies to keep you signed in</li>
              </ul>

              <h2>3. Managing Cookies</h2>
              <p>
                You can control and manage cookies through your browser settings. Please note that
                removing or blocking cookies may impact your experience on our website.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CookiePolicy;