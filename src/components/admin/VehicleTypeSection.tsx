import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
import { VehicleType, NewVehicle, VehicleCategory } from "@/types/admin";

interface VehicleTypeSectionProps {
  vehicleTypes: VehicleType[];
  onVehicleTypesChange: () => void;
}

export const VehicleTypeSection = ({ vehicleTypes, onVehicleTypesChange }: VehicleTypeSectionProps) => {
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
    onVehicleTypesChange();
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
    onVehicleTypesChange();
  };

  return (
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
  );
};
