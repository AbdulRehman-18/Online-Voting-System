import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-16 relative overflow-hidden">
      {/* Gradient backgrounds */}
      <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-background to-background -z-10" />
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl -z-10" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-surface border border-white/10 mb-8">
            <span className="text-sm font-medium">240+ Web3 Projects Delivered</span>
          </div>

          <h1 className="heading text-5xl sm:text-6xl lg:text-7xl mb-8">
            Web3 Design
            <br />
            <span className="gradient-text">Agency.</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Better data leads to more performance models.
            Performant models lead to faster deployment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="button-primary">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="button-outline">
              View Projects
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {[
            { label: 'Customer', value: '5M+' },
            { label: 'Coverage', value: '450M+' },
            { label: 'Earning', value: '22%' },
            { label: 'Interest', value: '8.03%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-display font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;