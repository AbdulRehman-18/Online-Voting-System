import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How secure is Votera's voting system?",
    answer: "Votera uses end-to-end encryption, blockchain verification, and multiple security layers to ensure votes remain private and tamper-proof. Our system undergoes regular security audits and complies with ISO 27001, SOC 2, GDPR, and other security standards."
  },
  {
    question: "Can voters verify their votes were counted correctly?",
    answer: "Yes, Votera provides a unique verification code to each voter that allows them to confirm their vote was recorded correctly, without revealing their specific choices to maintain ballot secrecy."
  },
  {
    question: "What types of elections can I run with Votera?",
    answer: "Votera supports a wide range of election types including single-choice, multiple-choice, ranked-choice, approval voting, weighted voting, and custom voting methods. The platform works for board elections, student government, union votes, shareholder meetings, and more."
  },
  {
    question: "How do you prevent someone from voting twice?",
    answer: "Votera uses a combination of unique access codes, biometric verification options, and IP tracking to prevent duplicate voting. Each eligible voter receives a single-use access link, and our system employs advanced fraud detection to identify suspicious activity."
  },
  {
    question: "Can I customize the appearance of my ballots?",
    answer: "Absolutely! You can add your organization's logo, colors, and branding to create a seamless experience. You can also include candidate photos, biographies, position statements, and supporting documentation."
  },
  {
    question: "What if a voter needs accessibility accommodations?",
    answer: "Votera is WCAG 2.1 AA compliant and works with screen readers, keyboard navigation, and other assistive technologies. We offer high-contrast modes, adjustable text sizes, and support for over 40 languages to ensure all voters can participate."
  }
];

const FAQItem: React.FC<{ 
  faq: FAQItem; 
  isOpen: boolean; 
  toggleOpen: () => void;
  index: number;
}> = ({ faq, isOpen, toggleOpen, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="border-b border-gray-700 py-6"
    >
      <motion.button 
        className="flex justify-between items-center w-full text-left"
        onClick={toggleOpen}
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <h3 className="text-lg font-medium text-white">
          {faq.question}
        </h3>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-[#0CF2A0] shrink-0 ml-4" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 ml-4" strokeWidth={1.5} />
        )}
      </motion.button>
      
      <motion.div 
        className="overflow-hidden"
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <p className="text-gray-400 leading-relaxed pt-4">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#111111] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-48 h-48 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/3 right-10 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
            Support
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Frequently <span className="text-[#0CF2A0]">Asked Questions</span>
          </h2>
          <p className="text-lg text-gray-400">
            Get answers to common questions about Votera's online voting platform.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggleOpen={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>
          
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-300 mb-4">
            Still have questions?
          </p>
          <motion.a
            href="/contact"
            className="inline-flex items-center text-[#0CF2A0] font-medium hover:text-[#0CF2A0]/80 transition-colors group"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            Contact our support team
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;