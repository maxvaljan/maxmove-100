
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2">
        <Button
          variant={activeSection === "vehicle-types" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSectionChange("vehicle-types")}
        >
          Vehicle Types
        </Button>
        <Button
          variant={activeSection === "users" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSectionChange("users")}
        >
          Users
        </Button>
      </nav>
    </div>
  );
};
