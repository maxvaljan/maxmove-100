import { Badge } from "@/components/ui/badge";
import { Phone, Navigation } from "lucide-react";

const AppDownload = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-maxmove-50 to-white">
      <h2 className="text-4xl font-bold text-center text-maxmove-900 mb-16">
        Our Apps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Customer App */}
        <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-maxmove-800 mb-6">
            Our Customer App
          </h3>
          <div className="relative inline-block group">
            <div className="relative w-48 h-96 mx-auto mb-6 rounded-[3rem] border-8 border-maxmove-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-maxmove-600 to-maxmove-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Phone className="w-16 h-16 text-white/80" />
                </div>
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent p-6 flex flex-col justify-end">
                  <p className="text-white text-sm">
                    Track your deliveries in real-time
                  </p>
                </div>
              </div>
            </div>
            <Badge className="absolute -top-2 -right-2 bg-maxmove-600">
              Coming Soon
            </Badge>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on App Store"
              className="h-10 w-auto opacity-50 hover:opacity-75 transition-opacity"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10 w-auto opacity-50 hover:opacity-75 transition-opacity"
            />
          </div>
        </div>

        {/* Driver App */}
        <div className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold text-maxmove-800 mb-6">
            Our Driver App
          </h3>
          <div className="relative inline-block">
            <div className="relative w-48 h-96 mx-auto mb-6 rounded-[3rem] border-8 border-maxmove-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-maxmove-700 to-maxmove-900">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Navigation className="w-16 h-16 text-white/80" />
                </div>
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent p-6 flex flex-col justify-end">
                  <p className="text-white text-sm">
                    Optimize your routes and earnings
                  </p>
                </div>
              </div>
            </div>
            <Badge className="absolute -top-2 -right-2 bg-maxmove-600">
              Coming Soon
            </Badge>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on App Store"
              className="h-10 w-auto opacity-50 hover:opacity-75 transition-opacity"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10 w-auto opacity-50 hover:opacity-75 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;