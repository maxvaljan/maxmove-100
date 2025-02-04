import { MapPin, Truck, MessageSquare, Send, Navigation, User, ChevronRight } from "lucide-react";

const DeliveryWorkflow = () => {
  const steps = [
    {
      icon: <MapPin className="w-6 h-6 text-[#FF6B35]" />,
      title: "Set Pick-up & Destination",
      description: "Set pick-up point and destination to get instant price details."
    },
    {
      icon: <Truck className="w-6 h-6 text-[#FF6B35]" />,
      title: "Choose Vehicle & Services",
      description: "Pick a vehicle and choose any additional services (if required)."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-[#FF6B35]" />,
      title: "Add Note & Preferences",
      description: "Add a note to your driver and show the order to your favourite drivers first."
    },
    {
      icon: <Send className="w-6 h-6 text-[#FF6B35]" />,
      title: "Place Order",
      description: "Place your order and the driver will contact you once the order is matched."
    },
    {
      icon: <Navigation className="w-6 h-6 text-[#FF6B35]" />,
      title: "Track in Real-Time",
      description: "You can track your driver in real time during the delivery."
    }
  ];

  return (
    <section className="py-16 bg-maxmove-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-maxmove-900">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col items-center text-center group-hover:border-[#FF6B35] border-2 border-transparent">
                <div className="mb-4 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2 text-maxmove-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryWorkflow;