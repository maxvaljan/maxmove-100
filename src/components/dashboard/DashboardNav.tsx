import { Link } from "react-router-dom";

const DashboardNav = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link
        to="/place-order"
        className="text-maxmove-500 font-medium hover:text-maxmove-600 transition-colors"
      >
        Place Order
      </Link>
      <Link
        to="/records"
        className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
      >
        Records
      </Link>
      <Link
        to="/wallet"
        className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
      >
        Wallet
      </Link>
      <Link
        to="/drivers"
        className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
      >
        Drivers
      </Link>
      <Link
        to="/rewards"
        className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
      >
        Rewards
      </Link>
    </nav>
  );
};

export default DashboardNav;