
import {
  Package,
  Users,
  Truck,
  Settings,
  CreditCard,
  Bell,
  Building2,
} from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "vehicle-types", label: "Vehicle Types", icon: Truck },
  { id: "users", label: "Users", icon: Users },
  { id: "orders", label: "Orders", icon: Package },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "business", label: "Business", icon: Building2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-bold text-maxmove-900">Admin Dashboard</h2>
      </div>
      <nav className="mt-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
              activeSection === section.id
                ? "bg-maxmove-50 text-maxmove-900 border-r-2 border-maxmove-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <section.icon className="mr-3 h-5 w-5" />
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
