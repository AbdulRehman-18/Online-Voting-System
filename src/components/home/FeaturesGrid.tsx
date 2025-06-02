import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, BarChart3, Users, Globe } from 'lucide-react';

// Utility function for class merging
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Custom motion component to replace framer-motion
const MotionDiv = ({ children, className, delay = 0, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        'transform transition-all duration-700 ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Feature = ({ 
  icon, 
  title, 
  description,
  delay
}) => {
  return (
    <MotionDiv delay={delay} className="h-full">
      <div 
        className={cn(
          "p-8 h-full border border-gray-700 rounded-xl bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-300",
          "hover:shadow-[0_0_20px_rgba(12,242,160,0.1)] hover:border-[#0CF2A0]/30"
        )}
      >
        <div className="bg-[#0CF2A0]/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </MotionDiv>
  );
};

// Grid pattern SVG component
const GridPattern = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%230CF2A0' stroke-width='0.5'%3E%3Cpath d='M4 0h52M0 4h60M4 60H56M60 56H0Z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
};

const FeaturesGrid = () => {
  return (
    <section className="py-20 bg-[#111111] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-20"></div>
      
      {/* Animated grid pattern */}
      <GridPattern />
      
      <div className="container mx-auto px-6 relative z-10">
        <MotionDiv
          delay={0.2}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
            Advanced Capabilities
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Powerful Features for Every <span className="text-[#0CF2A0]">Election</span>
          </h2>
          <p className="text-lg text-gray-400">
            Votera comes equipped with everything you need to run successful, secure elections of any size.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Feature
            icon={<ShieldCheck className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />}
            title="Enterprise-Grade Security"
            description="End-to-end encryption, multi-factor authentication, and blockchain verification ensure votes remain secure and tamper-proof."
            delay={0.2}
          />
          
          <Feature
            icon={<BarChart3 className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />}
            title="Advanced Analytics"
            description="Gain insights with detailed voting patterns, turnout metrics, and demographic analysis through our interactive dashboard."
            delay={0.4}
          />
          
          <Feature
            icon={<Users className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />}
            title="Customizable Access Controls"
            description="Define voter eligibility, set up weighted voting systems, and implement custom approval workflows to match your organization's needs."
            delay={0.6}
          />
          
          <Feature
            icon={<Globe className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />}
            title="Global Accessibility"
            description="Multi-language support, screen reader compatibility, and responsive design ensure everyone can participate, regardless of location or ability."
            delay={0.8}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;