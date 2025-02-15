
import { Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (value: string) => {
    i18n.changeLanguage(value);
  };

  return <footer className="bg-maxmove-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Maxmove</h3>
            <p className="text-maxmove-300">
              {t('common.footer.slogan')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/maxmove" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-maxmove-300 hover:text-white transition-colors"
              >
                <Linkedin className="h-8 w-8" />
              </a>
            </div>
            <div className="mt-4">
              <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
                <SelectTrigger className="w-[120px] bg-transparent border-maxmove-800 text-maxmove-300">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('common.footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.home')}
                </Link>
              </li>
              <li>
                <Link to="/personal-delivery" className="text-maxmove-300 hover:text-white transition-colors">
                  Personal Delivery
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.business')}
                </Link>
              </li>
              <li>
                <Link to="/drivers" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.drivers')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.about')}
                </Link>
              </li>
              <li>
                <Link to="/career" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.careers')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('common.footer.legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/legal/terms" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.terms')}
                </Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.cookies')}
                </Link>
              </li>
              <li>
                <Link to="/legal/privacy" className="text-maxmove-300 hover:text-white transition-colors">
                  {t('common.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('common.footer.contact')}</h4>
            <ul className="space-y-2">
              <li className="text-maxmove-300">
                contact@maxmove.com
              </li>
              <li className="text-maxmove-300">+49 173 4224371</li>
              <li className="text-maxmove-300">
                Eulenbergstr.37
                <br />
                51065 Köln, Deutschland
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-maxmove-800">
          <p className="text-center text-maxmove-300">
            {t('common.footer.rights')}
          </p>
        </div>
      </div>
    </footer>;
};

export default Footer;
