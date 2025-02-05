import { Button } from "@/components/ui/button";

interface VehicleCategorySelectorProps {
  selectedCategory: 'express' | 'heavy';
  onCategoryChange: (category: 'express' | 'heavy') => void;
}

const VehicleCategorySelector = ({
  selectedCategory,
  onCategoryChange,
}: VehicleCategorySelectorProps) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={selectedCategory === 'express' ? "default" : "outline"}
        onClick={() => onCategoryChange('express')}
        className="flex-1"
      >
        Express Delivery
      </Button>
      <Button
        variant={selectedCategory === 'heavy' ? "default" : "outline"}
        onClick={() => onCategoryChange('heavy')}
        className="flex-1"
      >
        Heavy Transport
      </Button>
    </div>
  );
};

export default VehicleCategorySelector;