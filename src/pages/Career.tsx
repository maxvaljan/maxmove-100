import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface JobListing {
  id: string;
  title: string;
  type: string;
  location: string;
}

const jobListings: JobListing[] = [
  {
    id: "fullstack-dev",
    title: "Full-Stack Developer",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
  },
  {
    id: "ios-dev",
    title: "iOS Developer",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
  },
  {
    id: "eng-intern",
    title: "Software Engineering Intern",
    location: "Cologne, Germany / Remote",
    type: "Internship",
  },
];

const Career = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-maxmove-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-maxmove-900 mb-6">
                Join Our Team
              </h1>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-maxmove-100 p-4"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-maxmove-900">
                        {job.title}
                      </h3>
                      <p className="text-sm text-maxmove-600">
                        {job.location} · {job.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center text-maxmove-600">
              Send your application to{" "}
              <a 
                href="mailto:max@maxmove.com" 
                className="text-maxmove-800 hover:underline"
              >
                max@maxmove.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Career;