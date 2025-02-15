
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleType, NewVehicle, VehicleCategory, VehicleTypeCategory } from "@/types/admin";
import { VehicleList } from "./vehicle/VehicleList";
import { CategoryList } from "./vehicle/CategoryList";
import { VehicleDialog } from "./vehicle/VehicleDialog";
import { CategoryDialog } from "./vehicle/CategoryDialog";

interface VehicleTypeSectionProps {
  vehicleTypes: VehicleType[];
  onVehicleTypesChange: () => void;
}

export const VehicleTypeSection = ({ vehicleTypes, onVehicleTypesChange }: VehicleTypeSectionProps) => {
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<VehicleTypeCategory[]>([]);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<VehicleTypeCategory | null>(null);
  const [newCategory, setNewCategory] = useState<{ name: string; description: string }>({ 
    name: "", 
    description: "" 
  });
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
    fetchCategories();
  }, []);

  const handleFileUpload = async (file: File, vehicleId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${vehicleId}.${fileExt}`;
      const filePath = `vehicle-icons/${fileName}`;

      const { data: vehicleData } = await supabase
        .from('vehicle_types')
        .select('icon_path')
        .eq('id', vehicleId)
        .single();

      if (vehicleData?.icon_path) {
        await supabase.storage
          .from('vehicles')
          .remove([vehicleData.icon_path]);
      }

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
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading vehicle icon');
      throw error;
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicle_categories')
        .select('*')
        .order('name');

      if (error) throw error;

      const typedCategories: VehicleTypeCategory[] = data.map(category => ({
        id: category.id,
        name: category.name as VehicleCategory,
        description: category.description
      }));

      setCategories(typedCategories);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast.error('Error loading vehicle categories');
    }
  };

  const handleAddCategory = async () => {
    try {
      const { error } = await supabase
        .from('vehicle_categories')
        .insert([{ 
          name: newCategory.name as VehicleCategory, 
          description: newCategory.description 
        }]);

      if (error) throw error;

      toast.success('Category added successfully');
      setIsAddCategoryOpen(false);
      fetchCategories();
      setNewCategory({ name: "", description: "" });
    } catch (error: any) {
      console.error('Error adding category:', error);
      toast.error(error.message || 'Error adding category');
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategory) return;

    try {
      const { error } = await supabase
        .from('vehicle_categories')
        .update({ 
          name: selectedCategory.name, 
          description: selectedCategory.description 
        })
        .eq('id', selectedCategory.id);

      if (error) throw error;

      toast.success('Category updated successfully');
      setIsEditCategoryOpen(false);
      fetchCategories();
      setSelectedCategory(null);
    } catch (error: any) {
      console.error('Error updating category:', error);
      toast.error(error.message || 'Error updating category');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('vehicle_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Category deleted successfully');
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast.error(error.message || 'Error deleting category');
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
    } catch (error: any) {
      console.error('Error adding vehicle:', error);
      toast.error(error.message || "Error adding vehicle type");
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
    } catch (error: any) {
      console.error('Error updating vehicle:', error);
      toast.error(error.message || "Error updating vehicle type");
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    try {
      const { data: vehicleData } = await supabase
        .from('vehicle_types')
        .select('icon_path')
        .eq('id', id)
        .single();

      if (vehicleData?.icon_path) {
        await supabase.storage
          .from('vehicles')
          .remove([vehicleData.icon_path]);
      }

      const { error } = await supabase
        .from("vehicle_types")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Vehicle type deleted successfully");
      onVehicleTypesChange();
    } catch (error: any) {
      console.error('Error deleting vehicle:', error);
      toast.error(error.message || "Error deleting vehicle type");
    }
  };

  return (
    <div>
      <Tabs defaultValue="vehicles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-6">
          <div className="flex justify-between items-center">
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
            <VehicleList
              vehicles={vehicleTypes}
              onEdit={(vehicle) => {
                setSelectedVehicle(vehicle);
                setIsEditVehicleOpen(true);
              }}
              onDelete={handleDeleteVehicle}
            />
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">Vehicle Categories</h3>
            <Button
              variant="default"
              className="bg-maxmove-500 hover:bg-maxmove-600"
              onClick={() => setIsAddCategoryOpen(true)}
            >
              Add Category
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <CategoryList
              categories={categories}
              onEdit={(category) => {
                setSelectedCategory(category);
                setIsEditCategoryOpen(true);
              }}
              onDelete={handleDeleteCategory}
            />
          </div>
        </TabsContent>
      </Tabs>

      <VehicleDialog
        isOpen={isAddVehicleOpen}
        onClose={() => setIsAddVehicleOpen(false)}
        isEdit={false}
        vehicle={newVehicle}
        onSave={handleAddVehicle}
        onVehicleChange={setNewVehicle}
        selectedFile={selectedFile}
        onFileChange={setSelectedFile}
      />

      <VehicleDialog
        isOpen={isEditVehicleOpen}
        onClose={() => setIsEditVehicleOpen(false)}
        isEdit={true}
        vehicle={selectedVehicle || newVehicle}
        onSave={handleEditVehicle}
        onVehicleChange={(updates) => setSelectedVehicle(prev => prev ? { ...prev, ...updates } : null)}
        selectedFile={selectedFile}
        onFileChange={setSelectedFile}
      />

      <CategoryDialog
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        isEdit={false}
        category={newCategory}
        onSave={handleAddCategory}
        onCategoryChange={setNewCategory}
      />

      <CategoryDialog
        isOpen={isEditCategoryOpen}
        onClose={() => setIsEditCategoryOpen(false)}
        isEdit={true}
        category={selectedCategory || newCategory}
        onSave={handleEditCategory}
        onCategoryChange={(updates) => setSelectedCategory(prev => prev ? { ...prev, ...updates } : null)}
      />
    </div>
  );
};
