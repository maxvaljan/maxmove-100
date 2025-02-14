
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import Index from "@/pages/Index";
import Business from "@/pages/Business";
import Career from "@/pages/Career";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import PersonalDelivery from "@/pages/PersonalDelivery";
import Dashboard from "@/pages/Dashboard";
import Drivers from "@/pages/Drivers";
import Book from "@/pages/Book";
import AdminDashboard from "@/pages/AdminDashboard";
import AccountTypeSelection from "@/pages/AccountTypeSelection";
import DriverApplication from "@/pages/DriverApplication";
import DriverDashboard from "@/pages/DriverDashboard";
import Investment from "@/pages/Investment";
import Onboarding from "@/pages/Onboarding";
import Roadmap from "@/pages/Roadmap";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/business" element={<Business />} />
        <Route path="/career" element={<Career />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/personal-delivery" element={<PersonalDelivery />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/book" element={<Book />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/account-type" element={<AccountTypeSelection />} />
        <Route path="/driver-application" element={<DriverApplication />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
