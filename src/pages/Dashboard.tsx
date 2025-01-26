import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, MapPin, Clock, Star } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/signin");
      } else {
        fetchUserData(session.user.id);
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

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch recent orders
      const { data: orders } = await supabase
        .from("Order")
        .select("*")
        .eq("customer_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      // Fetch saved locations
      const { data: locations } = await supabase
        .from("Location")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setRecentOrders(orders || []);
      setSavedLocations(locations || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maxmove-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-maxmove-900 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Package2 className="h-4 w-4 text-maxmove-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentOrders.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Locations</CardTitle>
              <MapPin className="h-4 w-4 text-maxmove-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{savedLocations.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-maxmove-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentOrders.filter(order => order.status === "pending" || order.status === "in_transit").length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-maxmove-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border"
                    >
                      <div>
                        <p className="font-medium text-maxmove-900">
                          {order.pickup_address} → {order.dropoff_address}
                        </p>
                        <p className="text-sm text-maxmove-600">
                          Status: {order.status}
                        </p>
                      </div>
                      <p className="font-medium text-maxmove-900">
                        ${order.price}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-maxmove-600">No recent orders</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Saved Locations</CardTitle>
            </CardHeader>
            <CardContent>
              {savedLocations.length > 0 ? (
                <div className="space-y-4">
                  {savedLocations.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border"
                    >
                      <div>
                        <p className="font-medium text-maxmove-900">
                          {location.label || "Unnamed Location"}
                        </p>
                        <p className="text-sm text-maxmove-600">
                          {location.address}
                        </p>
                      </div>
                      <MapPin className="h-4 w-4 text-maxmove-600" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-maxmove-600">No saved locations</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;