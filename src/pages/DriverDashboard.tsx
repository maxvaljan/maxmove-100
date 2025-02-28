
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, MapPin, Navigation, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DriverDashboardHeader from "@/components/driver/DriverDashboardHeader";
import LocationUpdater from "@/components/driver/LocationUpdater";
import { Switch } from "@/components/ui/switch";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [driverStatus, setDriverStatus] = useState("offline");
  const [currentLocation, setCurrentLocation] = useState(null);
  const { toast } = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session data:", session);
      setSession(session);
      if (!session) {
        navigate("/signin");
      } else {
        // First ensure driver record exists
        ensureDriverRecord(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/signin");
      }
    });

    // Get driver's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location",
            variant: "destructive",
          });
        }
      );
    }

    return () => subscription.unsubscribe();
  }, [navigate]);

  const ensureDriverRecord = async (userId) => {
    console.log("Ensuring driver record exists for:", userId);
    try {
      // Try to fetch existing driver record
      const { data: existingDriver, error: fetchError } = await supabase
        .from('Driver')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking driver record:", fetchError);
        throw fetchError;
      }

      if (!existingDriver) {
        // Create new driver record if none exists
        const { error: insertError } = await supabase
          .from('Driver')
          .insert([
            {
              id: userId,
              status: 'offline',
              vehicle_type: 'car', // Default value
              vehicle_number: 'PENDING', // Default value
              latitude: 0,
              longitude: 0
            }
          ]);

        if (insertError) {
          console.error("Error creating driver record:", insertError);
          throw insertError;
        }
      }

      // Now fetch the status
      fetchDriverStatus(userId);
    } catch (error) {
      console.error("Error in ensureDriverRecord:", error);
      toast({
        title: "Error",
        description: "Failed to initialize driver record",
        variant: "destructive",
      });
    }
  };

  const fetchDriverStatus = async (userId) => {
    try {
      console.log("Fetching status for user:", userId);
      const { data, error } = await supabase
        .from('Driver')
        .select('status')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching driver status:", error);
        throw error;
      }
      if (data) {
        console.log("Fetched driver status:", data.status);
        setDriverStatus(data.status);
      }
    } catch (error) {
      console.error("Error fetching driver status:", error);
      toast({
        title: "Error",
        description: "Failed to fetch driver status",
        variant: "destructive",
      });
    }
  };

  const updateDriverStatus = async (newStatus) => {
    if (!session?.user?.id || isUpdating) return;

    setIsUpdating(true);
    try {
      console.log("Updating status for user:", session.user.id, "to:", newStatus);
      const { error } = await supabase
        .from('Driver')
        .update({ status: newStatus })
        .eq('id', session.user.id);

      if (error) throw error;

      setDriverStatus(newStatus);
      toast({
        title: "Status Updated",
        description: `You are now ${newStatus}`,
      });
      console.log("Updated driver status to:", newStatus);
    } catch (error) {
      console.error("Error updating driver status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusToggle = (checked) => {
    const newStatus = checked ? "available" : "offline";
    updateDriverStatus(newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DriverDashboardHeader />
      {driverStatus === 'available' && <LocationUpdater />}
      <main className="p-6 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {driverStatus === "offline" ? "Go Online" : "Go Offline"}
            </span>
            <Switch
              checked={driverStatus === "available"}
              onCheckedChange={handleStatusToggle}
              disabled={isUpdating}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{driverStatus}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Location</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentLocation ? "Active" : "Unavailable"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Navigation</CardTitle>
              <Navigation className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ready</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
