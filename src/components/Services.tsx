import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'UI/UX Design',
    description: 'Hands-on learning via real-life innovation projects. Save Rs 8,210 On This Course. Create immersive UI via wireframes.',
    features: [
      'User Interface design',
      'User Experience Design',
      'Mobile Application design'
    ],
    image: '/images/uiux.webp'
  },
  {
    title: 'NFT Art',
    description: 'Create unique digital assets and collections with our expert NFT artists and designers.',
    features: [
      'Custom NFT Creation',
      'Collection Design',
      'Marketplace Integration'
    ],
    image: '/images/nft.webp'
  },
  {
    title: 'Development',
    description: 'Full-stack Web3 development services for dApps, smart contracts, and DeFi platforms.',
    features: [
      'Smart Contract Development',
      'dApp Development',
      'Blockchain Integration'
    ],
    image: '/images/development.webp'
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading text-4xl sm:text-5xl text-center mb-16"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card group hover:border-primary/50 transition-colors"
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-accent/10">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-display font-bold mb-4">
                {service.title}
              </h3>

              <p className="text-white/70 mb-6">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="button-outline w-full group-hover:bg-primary group-hover:border-primary">
                Learn More
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;