
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";

// Auth Pages
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";

// Main Pages
import Index from "@/pages/Index";
import About from "@/pages/About";
import Investment from "@/pages/Investment";
import Roadmap from "@/pages/Roadmap";

// Business & Career
import Business from "@/pages/Business";
import Career from "@/pages/Career";

// Dashboard & Features
import Dashboard from "@/pages/Dashboard";
import Book from "@/pages/Book";

// Driver Related
import DriverDashboard from "@/pages/DriverDashboard";
import DriverApplication from "@/pages/DriverApplication";
import Drivers from "@/pages/Drivers";

// Admin
import AdminDashboard from "@/pages/AdminDashboard";

// Account
import AccountTypeSelection from "@/pages/AccountTypeSelection";
import Onboarding from "@/pages/Onboarding";

// Legal
import Terms from "@/pages/Terms";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";

// Services
import PersonalDelivery from "@/pages/PersonalDelivery";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/roadmap" element={<Roadmap />} />

        {/* Auth Routes */}
        <Route path="/auth">
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="update-password" element={<UpdatePassword />} />
        </Route>

        {/* Business & Career */}
        <Route path="/business" element={<Business />} />
        <Route path="/career" element={<Career />} />

        {/* Dashboard & Core Features */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/book" element={<Book />} />

        {/* Driver Routes */}
        <Route path="/driver">
          <Route path="dashboard" element={<DriverDashboard />} />
          <Route path="apply" element={<DriverApplication />} />
        </Route>
        <Route path="/drivers" element={<Drivers />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminDashboard />} />

        {/* Account Setup */}
        <Route path="/account-type" element={<AccountTypeSelection />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Legal */}
        <Route path="/legal">
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="cookies" element={<CookiePolicy />} />
        </Route>

        {/* Services */}
        <Route path="/personal-delivery" element={<PersonalDelivery />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
