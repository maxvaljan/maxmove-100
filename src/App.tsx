import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Drivers from "./pages/Drivers";
import DriverApplication from "./pages/DriverApplication";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Clock,
  CreditCard,
  Smartphone,
  Shield,
  Calendar,
  MapPin,
} from "lucide-react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/drivers/apply" element={<DriverApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
