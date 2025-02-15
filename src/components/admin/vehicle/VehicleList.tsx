
import { Edit2, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { VehicleType } from "@/types/admin";
import VehicleIcon from "@/components/vehicle/VehicleIcon";

interface VehicleListProps {
  vehicles: VehicleType[];
  onEdit: (vehicle: VehicleType) => void;
  onDelete: (id: string) => void;
}

export const VehicleList = ({ vehicles, onEdit, onDelete }: VehicleListProps) => {
  return (
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
        {vehicles.map((vehicle) => (
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
                  onClick={() => onEdit(vehicle)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDelete(vehicle.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
