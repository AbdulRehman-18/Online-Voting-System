import React, { useState, useEffect, useRef } from 'react';
import { FileText, Vote, BarChart3 } from 'lucide-react';

// Utility function for class merging
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Custom motion component to replace framer-motion
const MotionDiv = ({ children, className, initial, animate, transition, delay = 0, ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const StepCard = ({ icon, title, description, delay, isVisible }) => {
  return (
    <MotionDiv delay={delay} className="h-full">
      <div 
        className={cn(
          "p-8 h-full border border-gray-700 rounded-xl bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-300",
          "hover:shadow-[0_0_20px_rgba(12,242,160,0.1)] hover:border-[#0CF2A0]/30"
        )}
      >
        <div className="bg-[#0CF2A0]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </MotionDiv>
  );
};

// Animated connector component
const AnimatedConnector = ({ delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
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
        "h-1 bg-gradient-to-r from-[#0CF2A0]/20 via-[#0CF2A0]/50 to-[#0CF2A0]/20 transition-all duration-1000",
        isVisible ? 'w-full' : 'w-0'
      )}
    />
  );
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#111111] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-10 w-48 h-48 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-50"></div>
      <div className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <MotionDiv
          delay={0.2}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
            Our Process
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            How <span className="text-[#0CF2A0]">Votera</span> Works
          </h2>
          <p className="text-lg text-gray-400">
            Our platform simplifies the voting process while maintaining the highest security standards. 
            Here's how it works:
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            icon={<FileText className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
            title="Create an Election"
            description="Set up your election in minutes with customizable ballots, candidate information, and voting periods. Invite voters via email."
            delay={0.3}
            isVisible={true}
          />
          
          <StepCard
            icon={<Vote className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
            title="Secure Voting"
            description="Voters receive unique, encrypted access links. They cast ballots securely from any device with our intuitive interface."
            delay={0.5}
            isVisible={true}
          />
          
          <StepCard
            icon={<BarChart3 className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
            title="Real-Time Results"
            description="Watch results update in real-time with beautiful visualizations. Export detailed reports and analytics."
            delay={0.7}
            isVisible={true}
          />
        </div>
        
        {/* Animated connectors */}
        <div className="hidden md:flex items-center justify-between px-8 -mt-8 gap-4">
          <AnimatedConnector delay={0.8} />
          <AnimatedConnector delay={1.0} />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;