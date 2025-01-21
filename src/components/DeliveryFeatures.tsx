import { DollarSign, Clock, Truck, Shield, MapPin } from "lucide-react";

const DeliveryFeatures = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex items-start">
          <img
            src="/lovable-uploads/2ffff655-44c5-4251-9811-a26017d8c849.png"
            alt="Maxmove delivery vehicles on the road"
            className="rounded-2xl w-full object-cover shadow-lg"
          />
        </div>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-maxmove-800">
              Your 24/7 delivery partner
            </h2>
            <p className="text-2xl sm:text-3xl text-maxmove-600 font-semibold">
              Fast. Simple. Affordable.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <DollarSign className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Affordable</h3>
                <p className="text-maxmove-600">Transparent pricing with no hidden costs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Speedy order matching</h3>
                <p className="text-maxmove-600">Match orders and deliver your goods immediately.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Truck className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Reliable driver network</h3>
                <p className="text-maxmove-600">Different vehicle types and courier services for all kinds of delivery needs.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Shield className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Safe delivery</h3>
                <p className="text-maxmove-600">Professional and trained drivers ensure all your goods safely reach their destination.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="h-6 w-6 text-maxmove-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-maxmove-800">Real-time tracking</h3>
                <p className="text-maxmove-600">In-app tracking allows you and the receiver to track your order in real time during the delivery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryFeatures;