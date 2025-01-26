import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Book from "@/pages/Book";
import Business from "@/pages/Business";
import Career from "@/pages/Career";
import CookiePolicy from "@/pages/CookiePolicy";
import DriverApplication from "@/pages/DriverApplication";
import Drivers from "@/pages/Drivers";
import PersonalDelivery from "@/pages/PersonalDelivery";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import SignIn from "@/pages/SignIn";
import Terms from "@/pages/Terms";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/business" element={<Business />} />
        <Route path="/career" element={<Career />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/driver-application" element={<DriverApplication />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/personal-delivery" element={<PersonalDelivery />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;