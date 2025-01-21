import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-maxmove-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Maxmove</h3>
            <p className="text-maxmove-300">
              Your trusted partner for reliable and efficient moving services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-maxmove-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-maxmove-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-maxmove-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-maxmove-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-maxmove-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/personal-delivery" className="text-maxmove-300 hover:text-white transition-colors">
                  Personal Delivery
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-maxmove-300 hover:text-white transition-colors">
                  Business Solutions
                </Link>
              </li>
              <li>
                <Link to="/drivers" className="text-maxmove-300 hover:text-white transition-colors">
                  Become a Driver
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-maxmove-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-maxmove-300 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-maxmove-300 hover:text-white transition-colors">
                  Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-maxmove-300">
                Email: contact@maxmove.com
              </li>
              <li className="text-maxmove-300">
                Phone: (555) 123-4567
              </li>
              <li className="text-maxmove-300">
                Address: 123 Moving Street
                <br />
                City, State 12345
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-maxmove-800">
          <p className="text-center text-maxmove-300">
            © {new Date().getFullYear()} Maxmove. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;