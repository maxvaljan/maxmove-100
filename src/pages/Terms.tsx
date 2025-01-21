import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-maxmove-900 mb-8">Terms & Conditions</h1>
            
            <div className="prose prose-maxmove">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using Maxmove's services, you agree to be bound by these Terms and Conditions.
              </p>

              <h2>2. Use of Services</h2>
              <p>
                Our services are provided "as is" and are intended to be used for moving and delivery purposes.
                You agree to use our services only for lawful purposes and in accordance with these Terms.
              </p>

              <h2>3. User Responsibilities</h2>
              <p>
                When using our services, you agree to:
              </p>
              <ul>
                <li>Provide accurate information</li>
                <li>Maintain the security of your account</li>
                <li>Comply with all applicable laws</li>
                <li>Not engage in any harmful or fraudulent activities</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;