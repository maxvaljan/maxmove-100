
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Edit2, Trash2, Upload } from "lucide-react";
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
import VehicleIcon from "@/components/vehicle/VehicleIcon";

interface VehicleTypeSectionProps {
  vehicleTypes: VehicleType[];
  onVehicleTypesChange: () => void;
}

export const VehicleTypeSection = ({ vehicleTypes, onVehicleTypesChange }: VehicleTypeSectionProps) => {
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  const handleFileUpload = async (file: File, vehicleId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${vehicleId}.${fileExt}`;
      const filePath = `vehicle-icons/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('vehicles')
        .upload(filePath, file, {
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { error: updateError } = await supabase
        .from('vehicle_types')
        .update({ icon_path: filePath })
        .eq('id', vehicleId);

      if (updateError) {
        throw updateError;
      }

      toast.success('Vehicle icon updated successfully');
      onVehicleTypesChange();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading vehicle icon');
    }
  };

  const handleAddVehicle = async () => {
    try {
      const { data, error } = await supabase
        .from("vehicle_types")
        .insert(newVehicle)
        .select()
        .single();

      if (error) throw error;

      if (selectedFile && data) {
        await handleFileUpload(selectedFile, data.id);
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
      setSelectedFile(null);
    } catch (error) {
      toast.error("Error adding vehicle type");
    }
  };

  const handleEditVehicle = async () => {
    if (!selectedVehicle) return;

    try {
      const { error } = await supabase
        .from("vehicle_types")
        .update({
          name: selectedVehicle.name,
          category: selectedVehicle.category,
          description: selectedVehicle.description,
          dimensions: selectedVehicle.dimensions,
          max_weight: selectedVehicle.max_weight,
          base_price: selectedVehicle.base_price,
          price_per_km: selectedVehicle.price_per_km,
          minimum_distance: selectedVehicle.minimum_distance,
        })
        .eq("id", selectedVehicle.id);

      if (error) throw error;

      if (selectedFile) {
        await handleFileUpload(selectedFile, selectedVehicle.id);
      }

      toast.success("Vehicle type updated successfully");
      setIsEditVehicleOpen(false);
      onVehicleTypesChange();
      setSelectedVehicle(null);
      setSelectedFile(null);
    } catch (error) {
      toast.error("Error updating vehicle type");
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      const { error } = await supabase
        .from("vehicle_types")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Vehicle type deleted successfully");
      onVehicleTypesChange();
    } catch (error) {
      toast.error("Error deleting vehicle type");
    }
  };

  const renderVehicleDialog = (isEdit: boolean) => {
    const dialogTitle = isEdit ? "Edit Vehicle Type" : "Add New Vehicle Type";
    const vehicle = isEdit ? selectedVehicle : newVehicle;
    const setVehicle = isEdit 
      ? (updates: Partial<VehicleType>) => setSelectedVehicle(prev => prev ? { ...prev, ...updates } : null)
      : (updates: Partial<NewVehicle>) => setNewVehicle(prev => ({ ...prev, ...updates }));

    return (
      <Dialog 
        open={isEdit ? isEditVehicleOpen : isAddVehicleOpen} 
        onOpenChange={isEdit ? setIsEditVehicleOpen : setIsAddVehicleOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={vehicle?.name}
                onChange={(e) => setVehicle({ name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={vehicle?.category}
                onValueChange={(value: VehicleCategory) => setVehicle({ category: value })}
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
                value={vehicle?.description}
                onChange={(e) => setVehicle({ description: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                value={vehicle?.dimensions}
                onChange={(e) => setVehicle({ dimensions: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max_weight">Max Weight</Label>
              <Input
                id="max_weight"
                value={vehicle?.max_weight}
                onChange={(e) => setVehicle({ max_weight: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="base_price">Base Price</Label>
              <Input
                id="base_price"
                type="number"
                value={vehicle?.base_price}
                onChange={(e) => setVehicle({ base_price: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price_per_km">Price per KM</Label>
              <Input
                id="price_per_km"
                type="number"
                value={vehicle?.price_per_km}
                onChange={(e) => setVehicle({ price_per_km: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minimum_distance">Minimum Distance (km)</Label>
              <Input
                id="minimum_distance"
                type="number"
                value={vehicle?.minimum_distance}
                onChange={(e) => setVehicle({ minimum_distance: Number(e.target.value) })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Vehicle Icon</Label>
              <div className="flex items-center gap-4">
                {isEdit && selectedVehicle && (
                  <div className="w-24 h-24">
                    <VehicleIcon category={selectedVehicle.category} name={selectedVehicle.name} />
                  </div>
                )}
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => isEdit ? setIsEditVehicleOpen(false) : setIsAddVehicleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={isEdit ? handleEditVehicle : handleAddVehicle}>
              {isEdit ? "Save Changes" : "Add Vehicle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
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
              <TableHead>Icon</TableHead>
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
                <TableCell>
                  <div className="w-16 h-16">
                    <VehicleIcon category={vehicle.category} name={vehicle.name} />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{vehicle.name}</TableCell>
                <TableCell>{vehicle.category}</TableCell>
                <TableCell>{vehicle.description}</TableCell>
                <TableCell>{vehicle.dimensions}</TableCell>
                <TableCell>{vehicle.max_weight}</TableCell>
                <TableCell>${vehicle.base_price}</TableCell>
                <TableCell>${vehicle.price_per_km}/km</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsEditVehicleOpen(true);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {renderVehicleDialog(false)} {/* Add Vehicle Dialog */}
      {renderVehicleDialog(true)} {/* Edit Vehicle Dialog */}
    </div>
  );
};
