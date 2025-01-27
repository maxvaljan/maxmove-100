import DashboardLogo from "./dashboard/DashboardLogo";
import DashboardNav from "./dashboard/DashboardNav";
import UserActions from "./dashboard/UserActions";

const DashboardHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <DashboardLogo />
            <DashboardNav />
          </div>
          <UserActions />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;