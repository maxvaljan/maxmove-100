import { Link } from "react-router-dom";

export const SignUpHeader = () => {
  return (
    <div className="text-center">
      <Link to="/">
        <h2 className="text-4xl font-bold tracking-tight text-maxmove-900 hover:text-maxmove-800 transition-colors">
          Maxmove
        </h2>
      </Link>
    </div>
  );
};