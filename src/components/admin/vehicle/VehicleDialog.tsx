
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

interface VehicleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
  vehicle: VehicleType | NewVehicle;
  onSave: () => void;
  onVehicleChange: (updates: Partial<VehicleType | NewVehicle>) => void;
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
}

export const VehicleDialog = ({
  isOpen,
  onClose,
  isEdit,
  vehicle,
  onSave,
  onVehicleChange,
  selectedFile,
  onFileChange,
}: VehicleDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Vehicle Type" : "Add New Vehicle Type"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={vehicle.name}
              onChange={(e) => onVehicleChange({ name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={vehicle.category}
              onValueChange={(value: VehicleCategory) => onVehicleChange({ category: value })}
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
              value={vehicle.description}
              onChange={(e) => onVehicleChange({ description: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input
              id="dimensions"
              value={vehicle.dimensions}
              onChange={(e) => onVehicleChange({ dimensions: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="max_weight">Max Weight</Label>
            <Input
              id="max_weight"
              value={vehicle.max_weight}
              onChange={(e) => onVehicleChange({ max_weight: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="base_price">Base Price</Label>
            <Input
              id="base_price"
              type="number"
              value={vehicle.base_price}
              onChange={(e) => onVehicleChange({ base_price: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price_per_km">Price per KM</Label>
            <Input
              id="price_per_km"
              type="number"
              value={vehicle.price_per_km}
              onChange={(e) => onVehicleChange({ price_per_km: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minimum_distance">Minimum Distance (km)</Label>
            <Input
              id="minimum_distance"
              type="number"
              value={vehicle.minimum_distance}
              onChange={(e) => onVehicleChange({ minimum_distance: Number(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Vehicle Icon</Label>
            <div className="flex items-center gap-4">
              {isEdit && 'id' in vehicle && (
                <div className="w-24 h-24">
                  <VehicleIcon category={vehicle.category} name={vehicle.name} />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {isEdit ? "Save Changes" : "Add Vehicle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
