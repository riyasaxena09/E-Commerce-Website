
import { Zap, Truck, RefreshCw, Lock } from "lucide-react";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Get your orders delivered within 2-3 business days",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day hassle-free return policy",
    },
    {
      icon: Lock,
      title: "Secure Payment",
      description: "100% secure and encrypted transactions",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-black rounded-full">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
