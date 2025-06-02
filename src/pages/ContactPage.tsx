import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  
  // Set page title
  React.useEffect(() => {
    document.title = 'Contact Us - Votera';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Form submitted:', formData);
    alert('Thanks for your message! We\'ll get back to you soon.');
    setFormData(initialFormState);
  };

  return (
    <div className="pt-20 bg-[#111111] text-gray-300">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-80">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-[#0CF2A0]/10 blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium"
            >
              Let's Connect
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6"
            >
              Get in <span className="text-[#0CF2A0]">Touch</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Have questions about Votera? Our team is here to help you find the right voting solution for your organization.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
                Send Us a <span className="text-[#0CF2A0]">Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#1a1a1a] focus:border-[#0CF2A0] focus:ring focus:ring-[#0CF2A0]/20 transition-colors text-white placeholder-gray-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#1a1a1a] focus:border-[#0CF2A0] focus:ring focus:ring-[#0CF2A0]/20 transition-colors text-white placeholder-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#1a1a1a] focus:border-[#0CF2A0] focus:ring focus:ring-[#0CF2A0]/20 transition-colors text-white placeholder-gray-500"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-[#1a1a1a] focus:border-[#0CF2A0] focus:ring focus:ring-[#0CF2A0]/20 transition-colors text-white placeholder-gray-500"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="mt-4 w-full bg-[#0CF2A0] text-[#111111] px-5 py-3 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send className="h-5 w-5 mr-2" strokeWidth={1.5} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-8">
                Contact <span className="text-[#0CF2A0]">Information</span>
              </h2>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start">
                  <div className="bg-[#0CF2A0]/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <Mail className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-400 mb-1">
                      For general inquiries:
                    </p>
                    <a href="mailto:contact@votera.io" className="text-[#0CF2A0] hover:text-[#0CF2A0]/80 transition-colors">
                      contact@votera.io
                    </a>
                    <p className="text-gray-400 mt-2 mb-1">
                      For support:
                    </p>
                    <a href="mailto:support@votera.io" className="text-[#0CF2A0] hover:text-[#0CF2A0]/80 transition-colors">
                      support@votera.io
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0CF2A0]/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <Phone className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Call Us
                    </h3>
                    <p className="text-gray-400 mb-1">
                      Main Office:
                    </p>
                    <a href="tel:+15551234567" className="text-[#0CF2A0] hover:text-[#0CF2A0]/80 transition-colors">
                      +1 (555) 123-4567
                    </a>
                    <p className="text-gray-400 mt-2 mb-1">
                      Support Hotline:
                    </p>
                    <a href="tel:+15557654321" className="text-[#0CF2A0] hover:text-[#0CF2A0]/80 transition-colors">
                      +1 (555) 765-4321
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#0CF2A0]/10 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Visit Us
                    </h3>
                    <p className="text-gray-400">
                      123 Blockchain Blvd<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border border-gray-700 rounded-xl bg-[#1a1a1a]">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Office Hours
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Monday - Friday:</span>
                    <span className="text-white">9:00 AM - 6:00 PM PST</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Saturday:</span>
                    <span className="text-white">10:00 AM - 2:00 PM PST</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Sunday:</span>
                    <span className="text-white">Closed</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-6">
              Our <span className="text-[#0CF2A0]">Location</span>
            </h2>
            <p className="text-lg text-gray-400">
              Visit our headquarters in the heart of San Francisco.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-gray-700"
          >
            <div className="relative w-full h-[400px] bg-[#1a1a1a] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0CF2A0]/5 to-[#0CF2A0]/10 opacity-50"></div>
              
              {/* Blockchain-inspired grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwQ0YyQTAiIHN0cm9rZS13aWR0aD0iMC41Ij48cGF0aCBkPSJNMCAwaDQwTTAgNDBINDBNNDAgMEg0ME00MCA0MEg0MCIvPjwvZz48L3N2Zz4=')]"></div>
              </div>
              
              {/* Location pin */}
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0CF2A0] flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-[#111111]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Votera Headquarters
                </h3>
                <p className="text-gray-400">
                  123 Blockchain Blvd, San Francisco
                </p>
              </div>
              
              {/* Animated elements */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-[#0CF2A0]/20 border border-[#0CF2A0] animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#0CF2A0]/30 border border-[#0CF2A0] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-[#0CF2A0]/40 border border-[#0CF2A0] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;