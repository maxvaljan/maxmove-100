import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Car } from "lucide-react";

const DriversPage = () => {
  const { data: drivers, isLoading } = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Driver")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching drivers:", error);
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-maxmove-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Drivers Dashboard</h1>
      
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle Info</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers?.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">{driver.vehicle_type}</p>
                      <p className="text-sm text-gray-500">{driver.vehicle_number}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {driver.phone_number && (
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{driver.phone_number}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{driver.city || "Unknown"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      driver.status === "available" 
                        ? "success" 
                        : driver.status === "busy" 
                        ? "warning" 
                        : "secondary"
                    }
                  >
                    {driver.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{driver.rating?.toFixed(1) || "N/A"}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DriversPage;