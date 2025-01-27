import { Link } from "react-router-dom";

const DashboardLogo = () => {
  return (
    <Link to="/dashboard" className="flex items-center">
      <div className="w-8 h-8 bg-maxmove-500 rounded-full flex items-center justify-center">
        <span className="text-white font-bold">M</span>
      </div>
    </Link>
  );
};

export default DashboardLogo;