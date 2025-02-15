
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { VehicleTypeSection } from "@/components/admin/VehicleTypeSection";
import { UsersSection } from "@/components/admin/UsersSection";
import { VehicleType, UserProfile } from "@/types/admin";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("vehicle-types");
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No session found, redirecting to signin");
          setIsAdmin(false);
          setIsLoading(false);
          navigate("/signin");
          return;
        }

        console.log("Checking admin status for user:", session.user.id);
        
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile:", error);
          setIsAdmin(false);
          setIsLoading(false);
          toast.error("Error checking admin status");
          navigate("/dashboard");
          return;
        }

        if (!profile) {
          console.log("No profile found for user, creating default profile");
          const { error: createError } = await supabase
            .from("profiles")
            .insert([
              { 
                id: session.user.id,
                role: "customer",
                email: session.user.email
              }
            ]);

          if (createError) {
            console.error("Error creating profile:", createError);
            setIsAdmin(false);
            setIsLoading(false);
            toast.error("Error creating user profile");
            navigate("/dashboard");
            return;
          }

          setIsAdmin(false);
          setIsLoading(false);
          toast.error("Unauthorized access");
          navigate("/dashboard");
          return;
        }

        console.log("User profile:", profile);

        if (profile.role !== "admin") {
          console.log("User is not admin, redirecting...");
          setIsAdmin(false);
          setIsLoading(false);
          toast.error("Unauthorized access");
          navigate("/dashboard");
          return;
        }

        console.log("User is admin, proceeding...");
        setIsAdmin(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error in admin check:", error);
        setIsAdmin(false);
        setIsLoading(false);
        toast.error("Error checking admin status");
        navigate("/dashboard");
      }
    };

    checkAdminStatus();
  }, [navigate]);

  useEffect(() => {
    if (isAdmin && !isLoading) {
      if (activeSection === "vehicle-types") {
        fetchVehicleTypes();
      } else if (activeSection === "users") {
        fetchUsers();
      }
    }
  }, [activeSection, isAdmin, isLoading]);

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

  if (isLoading || isAdmin === null) {
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
        <AdminSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        <div className="flex-1 p-8">
          {activeSection === "vehicle-types" && (
            <VehicleTypeSection 
              vehicleTypes={vehicleTypes} 
              onVehicleTypesChange={fetchVehicleTypes} 
            />
          )}
          {activeSection === "users" && (
            <UsersSection users={users} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
