import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Abdul Rahman",
    role: "Chief Election Officer",
    company: "Global University",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "Votera transformed our student body elections. We saw a 68% increase in voter turnout and saved countless hours on vote tallying.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Nafeh",
    role: "Board Secretary",
    company: "Pacific Trust",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "The security features gave our shareholders complete confidence in our voting process. The audit trail and verification system is impeccable.",
    rating: 5
  },
  {
    id: 3,
    name: "Waris Patel",
    role: "Director of Operations",
    company: "Community Foundation",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "We needed a solution that was both secure and accessible to our diverse community members. Votera delivered on all fronts.",
    rating: 5
  },
  {
    id: 4,
    name: "lowkey Martinez",
    role: "IT Security Manager",
    company: "Enterprise Solutions",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quote: "As someone deeply concerned with cybersecurity, I was impressed by Votera's robust protection measures and transparent verification system.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
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
            Customer Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
            Trusted by Organizations <span className="text-[#0CF2A0]">Worldwide</span>
          </h2>
          <p className="text-lg text-gray-400">
            See why leading institutions choose Votera for their most critical elections.
          </p>
        </motion.div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden py-4 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <motion.div
                    key={`${setIndex}-${i}`}
                    whileHover={{ scale: 1.03 }}
                    className="flex"
                  >
                    <div className={cn(
                      "flex flex-col rounded-xl border border-gray-700",
                      "bg-[#1a1a1a] hover:bg-[#1f1f1f]",
                      "p-6 text-start",
                      "max-w-[320px] sm:max-w-[320px]",
                      "transition-all duration-300",
                      "hover:shadow-[0_0_20px_rgba(12,242,160,0.1)] hover:border-[#0CF2A0]/30"
                    )}>
                      <div className="flex space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-5 w-5 text-[#0CF2A0] fill-[#0CF2A0]/30" 
                            strokeWidth={1.5} 
                          />
                        ))}
                      </div>
                      <p className="sm:text-md mb-4 text-sm text-gray-300 italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center">
                        <div className="relative">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-[#0CF2A0]"
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0CF2A0] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#111111]">
                              <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-[#111111] sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-[#111111] sm:block" />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;