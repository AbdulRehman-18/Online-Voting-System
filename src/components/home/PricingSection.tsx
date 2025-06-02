import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import NumberFlow from '@number-flow/react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "STARTER",
    price: "7",
    yearlyPrice: "5",
    period: "per month",
    features: [
      "Up to 100 voters",
      "Basic ballot customization",
      "Email invitations",
      "Results dashboard",
      "24/7 support (limited)",
      "Basic analytics",
    ],
    description: "Perfect for small organizations and clubs",
    buttonText: "Start Free Trial",
    href: "#",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "10",
    yearlyPrice: "8",
    period: "per month",
    features: [
      "Up to 1,000 voters",
      "Advanced ballot customization",
      "Email and SMS invitations",
      "Results dashboard",
      "24/7 priority support",
      "Advanced analytics",
      "Custom branding",
      "Team collaboration",
    ],
    description: "Ideal for medium businesses and associations",
    buttonText: "Try Professional",
    href: "#",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "12",
    yearlyPrice: "10",
    period: "per month",
    features: [
      "Unlimited voters",
      "Advanced ballot customization",
      "Multi-channel invitations",
      "Results dashboard",
      "24/7 dedicated support",
      "Advanced analytics",
      "Custom branding",
      "API access",
      "SSO Authentication",
      "Custom contracts",
    ],
    description: "For large organizations with complex requirements",
    buttonText: "Contact Sales",
    href: "#",
    isPopular: false,
  }
];

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const newValue = !isAnnual;
    setIsAnnual(newValue);
    
    if (newValue && toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ["#0CF2A0", "#57dccd", "#1a1a1a", "#ffffff"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section className="py-20 bg-[#111111] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-20"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-15"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
            Flexible Plans
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Simple, <span className="text-[#0CF2A0]">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Choose the plan that's right for your organization's needs. All plans include our core security features.
          </p>
          
          <div className="flex justify-center mb-10">
            <div 
              ref={toggleRef}
              className="inline-flex items-center p-1 border border-gray-700 rounded-full bg-[#1a1a1a] cursor-pointer"
              onClick={handleToggle}
            >
              <div className="relative w-12 h-6">
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full transition-colors duration-300",
                    isAnnual ? "bg-[#0CF2A0]" : "bg-gray-700"
                  )}
                />
                <div 
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-300",
                    isAnnual ? "transform translate-x-6" : "translate-x-0.5"
                  )}
                />
              </div>
              <span className="ml-2 font-semibold text-gray-300">
                Annual billing <span className="text-[#0CF2A0]">(Save 20%)</span>
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 1 }}
              whileInView={{
                y: plan.isPopular ? -20 : 0,
                opacity: 1,
                x: index === 2 ? -30 : index === 0 ? 30 : 0,
                scale: index === 0 || index === 2 ? 0.94 : 1.0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                "rounded-2xl border p-6 bg-[#1a1a1a] text-center flex flex-col justify-center relative",
                plan.isPopular 
                  ? "border-[#0CF2A0] border-2 ring-2 ring-[#0CF2A0]/30" 
                  : "border-gray-700",
                "flex flex-col",
                !plan.isPopular && "mt-5",
                index === 0 || index === 2
                  ? "z-0 transform translate-x-0 translate-y-0 -translate-z-[50px] rotate-y-[10deg]"
                  : "z-10",
                index === 0 && "origin-right",
                index === 2 && "origin-left"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-[#0CF2A0] py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-[#111111] h-4 w-4 fill-current" />
                  <span className="text-[#111111] ml-1 font-sans font-semibold">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p className="text-base font-semibold text-gray-400">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    <NumberFlow
                      value={
                        isAnnual ? Number(plan.yearlyPrice) : Number(plan.price)
                      }
                      format={{
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      formatter={(value) => `$${value}`}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                      className="font-variant-numeric: tabular-nums"
                    />
                  </span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-500">
                    / {plan.period}
                  </span>
                </div>

                <p className="text-xs leading-5 text-gray-500 mt-1">
                  {isAnnual ? "billed annually" : "billed monthly"}
                </p>

                <ul className="mt-5 gap-2 flex flex-col">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-left">
                      <Check className="h-4 w-4 text-[#0CF2A0] mt-1 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-4 border-gray-700" />

                <motion.button
                  className={cn(
                    "group relative w-full py-2.5 rounded-md text-md font-semibold tracking-tighter",
                    "transform-gpu ring-offset-current transition-all duration-300 ease-out",
                    "hover:ring-2 hover:ring-[#0CF2A0] hover:ring-offset-1",
                    plan.isPopular
                      ? "bg-[#0CF2A0] text-[#111111] hover:bg-[#0CF2A0]/90"
                      : "bg-[#1f1f1f] text-white border border-gray-700 hover:bg-[#2a2a2a]"
                  )}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {plan.buttonText}
                </motion.button>
                <p className="mt-6 text-xs leading-5 text-gray-500">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;