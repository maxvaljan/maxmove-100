import { Badge } from "@/components/ui/badge";

const AppDownload = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-maxmove-900 mb-16">
        Our Apps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Customer App */}
        <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
          <h3 className="text-2xl font-bold text-maxmove-800 mb-6">
            Our Customer App
          </h3>
          <div className="relative inline-block">
            <img
              src="/placeholder.svg"
              alt="Maxmove Customer App"
              className="w-32 h-32 mx-auto mb-6"
            />
            <Badge className="absolute -top-2 -right-2 bg-maxmove-600">
              Coming Soon
            </Badge>
          </div>
          <div className="flex justify-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on App Store"
              className="h-10 w-auto opacity-50"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10 w-auto opacity-50"
            />
          </div>
        </div>

        {/* Driver App */}
        <div className="bg-white p-8 rounded-2xl text-center shadow-sm">
          <h3 className="text-2xl font-bold text-maxmove-800 mb-6">
            Our Driver App
          </h3>
          <div className="relative inline-block">
            <img
              src="/placeholder.svg"
              alt="Maxmove Driver App"
              className="w-32 h-32 mx-auto mb-6"
            />
            <Badge className="absolute -top-2 -right-2 bg-maxmove-600">
              Coming Soon
            </Badge>
          </div>
          <div className="flex justify-center gap-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on App Store"
              className="h-10 w-auto opacity-50"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-10 w-auto opacity-50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;