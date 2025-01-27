import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Package,
  Users,
  Truck,
  Settings,
  CreditCard,
  Bell,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState("vehicle-types");
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAdminStatus();
    if (activeSection === "vehicle-types") {
      fetchVehicleTypes();
    }
  }, [activeSection]);

  const checkAdminStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/signin");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      toast.error("Unauthorized access");
      navigate("/dashboard");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const fetchVehicleTypes = async () => {
    const { data, error } = await supabase
      .from("vehicle_types")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Error fetching vehicle types");
      return;
    }

    setVehicleTypes(data);
  };

  const sections = [
    { id: "vehicle-types", label: "Vehicle Types", icon: Truck },
    { id: "users", label: "Users", icon: Users },
    { id: "orders", label: "Orders", icon: Package },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "business", label: "Business", icon: Building2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maxmove-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-xl font-bold text-maxmove-900">Admin Dashboard</h2>
          </div>
          <nav className="mt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  activeSection === section.id
                    ? "bg-maxmove-50 text-maxmove-900 border-r-2 border-maxmove-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <section.icon className="mr-3 h-5 w-5" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {activeSection === "vehicle-types" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Vehicle Types</h3>
                <Button variant="default" className="bg-maxmove-500 hover:bg-maxmove-600">
                  Add Vehicle Type
                </Button>
              </div>
              <div className="bg-white rounded-lg shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Dimensions</TableHead>
                      <TableHead>Max Weight</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicleTypes.map((vehicle: any) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.name}</TableCell>
                        <TableCell>{vehicle.category}</TableCell>
                        <TableCell>{vehicle.description}</TableCell>
                        <TableCell>{vehicle.dimensions}</TableCell>
                        <TableCell>{vehicle.max_weight}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          
          {activeSection === "users" && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Users Management</h3>
              {/* Users management content will go here */}
            </div>
          )}
          
          {/* Add other sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;