import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const jobDetails = {
  "fullstack-dev": {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Full-time",
    description: "We're looking for a Full Stack Developer to join our engineering team and help build the next generation of delivery technology.",
    requirements: [
      "5+ years of experience in full-stack development",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with cloud services (AWS/GCP/Azure)",
      "Knowledge of modern web technologies and best practices",
      "Excellent problem-solving skills",
    ],
    responsibilities: [
      "Design and implement new features across the entire stack",
      "Write clean, maintainable, and efficient code",
      "Collaborate with cross-functional teams",
      "Participate in code reviews and technical discussions",
      "Mentor junior developers",
    ],
  },
  "marketing-manager": {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Berlin, Germany",
    type: "Full-time",
    description: "We're seeking a Marketing Manager to lead our marketing initiatives and drive growth.",
    requirements: [
      "5+ years of experience in digital marketing",
      "Strong analytical and strategic thinking skills",
      "Experience with marketing automation tools",
      "Excellent communication skills",
      "Data-driven decision making",
    ],
    responsibilities: [
      "Develop and execute marketing strategies",
      "Manage digital marketing campaigns",
      "Analyze marketing metrics and KPIs",
      "Collaborate with sales and product teams",
      "Build and maintain brand identity",
    ],
  },
  "ios-dev": {
    title: "iOS Developer",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Full-time",
    description: "Join our mobile team to build and maintain our iOS application.",
    requirements: [
      "3+ years of iOS development experience",
      "Strong knowledge of Swift and iOS frameworks",
      "Experience with RESTful APIs",
      "Understanding of iOS design principles",
      "Knowledge of mobile app architecture",
    ],
    responsibilities: [
      "Develop new features for our iOS app",
      "Maintain and improve existing functionality",
      "Collaborate with the design team",
      "Ensure app performance and reliability",
      "Write unit tests and documentation",
    ],
  },
  "backend-dev": {
    title: "Backend Developer",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Full-time",
    description: "We're looking for a Backend Developer to strengthen our engineering team.",
    requirements: [
      "4+ years of backend development experience",
      "Strong knowledge of Node.js and TypeScript",
      "Experience with databases and ORMs",
      "Understanding of microservices architecture",
      "Knowledge of API design principles",
    ],
    responsibilities: [
      "Design and implement backend services",
      "Optimize application performance",
      "Write clean and maintainable code",
      "Collaborate with frontend developers",
      "Participate in system design discussions",
    ],
  },
  "eng-intern": {
    title: "Software Engineering Intern",
    department: "Engineering",
    location: "Berlin, Germany",
    type: "Internship",
    description: "Join our engineering team as an intern and gain hands-on experience in software development.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Basic knowledge of web development",
      "Familiarity with JavaScript/TypeScript",
      "Strong problem-solving skills",
      "Eagerness to learn and grow",
    ],
    responsibilities: [
      "Assist in developing new features",
      "Learn from experienced developers",
      "Participate in code reviews",
      "Write and maintain documentation",
      "Contribute to team projects",
    ],
  },
};

const JobDetails = () => {
  const { jobId } = useParams();
  const job = jobDetails[jobId as keyof typeof jobDetails];

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-maxmove-900">Job not found</h1>
            <Link to="/career" className="text-maxmove-600 hover:text-maxmove-700 mt-4 inline-block">
              Return to Careers
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/career" 
            className="inline-flex items-center text-maxmove-600 hover:text-maxmove-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Link>

          <div className="bg-white rounded-lg shadow-sm border border-maxmove-100 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-maxmove-900 mb-4">{job.title}</h1>
              <div className="space-y-2">
                <p className="text-maxmove-600">{job.department} · {job.location}</p>
                <p className="text-maxmove-500">{job.type}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-maxmove-900 mb-4">About the Role</h2>
                <p className="text-maxmove-600">{job.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-maxmove-900 mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-maxmove-600">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-maxmove-900 mb-4">Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2 text-maxmove-600">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-6">
                <Button className="w-full md:w-auto bg-maxmove-800 hover:bg-maxmove-900">
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;