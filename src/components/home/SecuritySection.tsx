import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, Eye, ChevronRight } from 'lucide-react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface SecurityFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const SecurityFeature: React.FC<SecurityFeatureProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex mb-8 last:mb-0"
    >
      <div className="mr-4 mt-1">
        <div className="bg-[#0CF2A0]/10 w-12 h-12 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const SecuritySection: React.FC = () => {
  return (
    <section className="py-20 bg-[#111111] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-15"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0]">
              <Shield className="h-4 w-4 mr-2" strokeWidth={1.5} />
              <span className="text-sm font-medium">Bank-Level Security</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8">
              Security That Voters <span className="text-[#0CF2A0]">Can Trust</span>
            </h2>
            <div className="space-y-8 mb-10">
              <SecurityFeature
                icon={<Lock className="h-5 w-5 text-[#0CF2A0]" strokeWidth={1.5} />}
                title="End-to-End Encryption"
                description="Every vote is encrypted from the moment it's cast until it's counted, ensuring complete privacy and integrity."
                delay={0.1}
              />
              <SecurityFeature
                icon={<FileCheck className="h-5 w-5 text-[#0CF2A0]" strokeWidth={1.5} />}
                title="Auditable Trail"
                description="Comprehensive logs and blockchain verification allow for complete auditability without compromising voter privacy."
                delay={0.2}
              />
              <SecurityFeature
                icon={<Eye className="h-5 w-5 text-[#0CF2A0]" strokeWidth={1.5} />}
                title="Transparent Process"
                description="Voters can verify their votes were counted correctly while maintaining ballot secrecy."
                delay={0.3}
              />
            </div>
            <motion.button
              className="group flex items-center text-[#0CF2A0] font-medium"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              View Security Whitepaper
              <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:pl-16"
          >
            <div className="relative border border-gray-700 p-1 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0CF2A0]/10 to-transparent">
              <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
                {/* Abstract security pattern background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(12,242,160,0.4),transparent_70%)]"></div>
                  <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(12,242,160,0.3),transparent_70%)]"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="p-1">
                    <img 
                      src="https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Security Features" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <div className="bg-[#1f1f1f] backdrop-blur-sm p-6 rounded-lg border border-gray-700 m-4">
                    <h3 className="text-xl font-semibold text-white mb-4">Our Security Certifications</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {["ISO 27001", "GDPR", "SOC 2", "CCPA"].map((cert, index) => (
                        <motion.div
                          key={cert}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-[#0CF2A0]/10 p-3 rounded-lg flex items-center justify-center"
                        >
                          <span className="text-sm text-[#0CF2A0] font-medium">{cert}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;