import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  icon: JSX.Element;
}

const jobListings: JobListing[] = [
  {
    id: "fullstack-dev",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Full-time",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    department: "Marketing",
    location: "Berlin, Germany",
    type: "Full-time",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    id: "ios-dev",
    title: "iOS Developer",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Full-time",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Full-time",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    id: "eng-intern",
    title: "Software Engineering Intern",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Internship",
    icon: <GraduationCap className="h-6 w-6" />,
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
              <p className="text-xl text-maxmove-600 max-w-2xl mx-auto">
                Help us revolutionize the delivery industry with innovative solutions. 
                We're looking for passionate individuals to join our growing team.
              </p>
            </div>
          </div>
        </section>

        {/* Job Listings Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-maxmove-900 mb-8">
              Open Positions
            </h2>
            <div className="grid gap-6">
              {jobListings.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-sm border border-maxmove-100 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-maxmove-50 rounded-lg">
                        {job.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-maxmove-900">
                          {job.title}
                        </h3>
                        <div className="mt-2 space-y-1">
                          <p className="text-maxmove-600">
                            {job.department} · {job.location}
                          </p>
                          <p className="text-maxmove-500">{job.type}</p>
                        </div>
                      </div>
                    </div>
                    <Link to={`/career/${job.id}`}>
                      <Button variant="outline" className="hover:bg-maxmove-50">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-maxmove-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-maxmove-900 text-center mb-12">
              Why Join Maxmove?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-maxmove-900 mb-4">
                  Innovation First
                </h3>
                <p className="text-maxmove-600">
                  Work on cutting-edge technology and help shape the future of delivery services.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-maxmove-900 mb-4">
                  Growth & Development
                </h3>
                <p className="text-maxmove-600">
                  Continuous learning opportunities and career advancement paths for all team members.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-maxmove-900 mb-4">
                  Great Culture
                </h3>
                <p className="text-maxmove-600">
                  Join a diverse, inclusive team that values collaboration and work-life balance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Career;