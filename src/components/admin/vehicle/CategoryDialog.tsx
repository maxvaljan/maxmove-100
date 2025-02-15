
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
import { Textarea } from "@/components/ui/textarea";
import { VehicleTypeCategory } from "@/types/admin";

interface CategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
  category: VehicleTypeCategory | { name: string; description: string };
  onSave: () => void;
  onCategoryChange: (updates: Partial<VehicleTypeCategory | { name: string; description: string }>) => void;
}

export const CategoryDialog = ({
  isOpen,
  onClose,
  isEdit,
  category,
  onSave,
  onCategoryChange,
}: CategoryDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={category.name}
              onChange={(e) => onCategoryChange({ name: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={category.description || ""}
              onChange={(e) => onCategoryChange({ description: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {isEdit ? "Save Changes" : "Add Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
