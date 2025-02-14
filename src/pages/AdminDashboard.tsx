
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type VehicleCategory = "bike_motorcycle" | "car" | "van" | "light_truck" | "medium_truck" | "heavy_truck" | "towing" | "refrigerated";

interface VehicleType {
  id: string;
  name: string;
  category: VehicleCategory;
  description: string;
  dimensions: string;
  max_weight: string;
  base_price: number;
  price_per_km: number;
  minimum_distance: number;
}

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
  created_at: string;
  last_login: string | null;
}

interface NewVehicle {
  name: string;
  category: VehicleCategory;
  description: string;
  dimensions: string;
  max_weight: string;
  base_price: number;
  price_per_km: number;
  minimum_distance: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("vehicle-types");
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState<NewVehicle>({
    name: "",
    category: "car",
    description: "",
    dimensions: "",
    max_weight: "",
    base_price: 0,
    price_per_km: 0,
    minimum_distance: 0,
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin && !isLoading) {
      if (activeSection === "vehicle-types") {
        fetchVehicleTypes();
      } else if (activeSection === "users") {
        fetchUsers();
      }
    }
  }, [activeSection, isAdmin, isLoading]);

  const checkAdminStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/signin");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error checking admin status");
        navigate("/dashboard");
        return;
      }

      if (profile?.role !== "admin") {
        toast.error("Unauthorized access");
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      console.error("Error in admin check:", error);
      toast.error("Error checking admin status");
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
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

    setVehicleTypes(data || []);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching users");
      return;
    }

    setUsers(data || []);
  };

  const handleAddVehicle = async () => {
    const { error } = await supabase
      .from("vehicle_types")
      .insert(newVehicle);

    if (error) {
      toast.error("Error adding vehicle type");
      return;
    }

    toast.success("Vehicle type added successfully");
    setIsAddVehicleOpen(false);
    fetchVehicleTypes();
    setNewVehicle({
      name: "",
      category: "car",
      description: "",
      dimensions: "",
      max_weight: "",
      base_price: 0,
      price_per_km: 0,
      minimum_distance: 0,
    });
  };

  const handleDeleteVehicle = async (id: string) => {
    const { error } = await supabase
      .from("vehicle_types")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error deleting vehicle type");
      return;
    }

    toast.success("Vehicle type deleted successfully");
    fetchVehicleTypes();
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

  if (isLoading) {
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
        <div className="flex-1 p-8">
          {activeSection === "vehicle-types" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Vehicle Types</h3>
                <Button
                  variant="default"
                  className="bg-maxmove-500 hover:bg-maxmove-600"
                  onClick={() => setIsAddVehicleOpen(true)}
                >
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
                      <TableHead>Base Price</TableHead>
                      <TableHead>Price/km</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicleTypes.map((vehicle) => (
                      <TableRow key={vehicle.id}>
                        <TableCell className="font-medium">{vehicle.name}</TableCell>
                        <TableCell>{vehicle.category}</TableCell>
                        <TableCell>{vehicle.description}</TableCell>
                        <TableCell>{vehicle.dimensions}</TableCell>
                        <TableCell>{vehicle.max_weight}</TableCell>
                        <TableCell>${vehicle.base_price}</TableCell>
                        <TableCell>${vehicle.price_per_km}/km</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteVehicle(vehicle.id)}>
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
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Users</h3>
              </div>
              <div className="bg-white rounded-lg shadow">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name || "N/A"}</TableCell>
                        <TableCell>{user.email || "N/A"}</TableCell>
                        <TableCell className="capitalize">{user.role}</TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.last_login ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}>
                            {user.last_login ? "Active" : "Inactive"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
          <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Vehicle Type</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={newVehicle.name}
                    onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newVehicle.category}
                    onValueChange={(value: VehicleCategory) => setNewVehicle({ ...newVehicle, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bike_motorcycle">Bike/Motorcycle</SelectItem>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="light_truck">Light Truck</SelectItem>
                      <SelectItem value="medium_truck">Medium Truck</SelectItem>
                      <SelectItem value="heavy_truck">Heavy Truck</SelectItem>
                      <SelectItem value="towing">Towing</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newVehicle.description}
                    onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={newVehicle.dimensions}
                    onChange={(e) => setNewVehicle({ ...newVehicle, dimensions: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="max_weight">Max Weight</Label>
                  <Input
                    id="max_weight"
                    value={newVehicle.max_weight}
                    onChange={(e) => setNewVehicle({ ...newVehicle, max_weight: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="base_price">Base Price</Label>
                  <Input
                    id="base_price"
                    type="number"
                    value={newVehicle.base_price}
                    onChange={(e) => setNewVehicle({ ...newVehicle, base_price: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price_per_km">Price per KM</Label>
                  <Input
                    id="price_per_km"
                    type="number"
                    value={newVehicle.price_per_km}
                    onChange={(e) => setNewVehicle({ ...newVehicle, price_per_km: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minimum_distance">Minimum Distance (km)</Label>
                  <Input
                    id="minimum_distance"
                    type="number"
                    value={newVehicle.minimum_distance}
                    onChange={(e) => setNewVehicle({ ...newVehicle, minimum_distance: Number(e.target.value) })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddVehicleOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddVehicle}>Add Vehicle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
