
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Briefcase, Brain, LucideIcon } from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  type: string;
  location: string;
  icon: LucideIcon;
}

const jobListings: JobListing[] = [
  {
    id: "fullstack-dev",
    title: "Full-Stack Developer",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
    icon: Briefcase,
  },
  {
    id: "mechanical-engineer",
    title: "Mechanical Engineer",
    location: "Cologne, Germany",
    type: "Full-time",
    icon: Wrench,
  },
  {
    id: "operations-manager",
    title: "Operations Manager",
    location: "Cologne, Germany",
    type: "Full-time",
    icon: Briefcase,
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
    icon: Brain,
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
    icon: Briefcase,
  },
  {
    id: "ios-dev",
    title: "IOS Developer",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
    icon: Briefcase,
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    location: "Cologne, Germany / Remote",
    type: "Full-time",
    icon: Briefcase,
  },
  {
    id: "eng-intern",
    title: "Software Engineering Intern",
    location: "Cologne, Germany / Remote",
    type: "Internship",
    icon: Briefcase,
  },
];

const Career = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-maxmove-50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-maxmove-900">
                Join Our Team
              </h1>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-4">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-maxmove-100 p-4 hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-maxmove-600">
                          <job.icon size={20} />
                        </div>
                        <h3 className="text-lg font-semibold text-maxmove-900">
                          {job.title}
                        </h3>
                      </div>
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
