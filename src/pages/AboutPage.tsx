import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Shield, 
  Users, 
  CheckCircle, 
  Clock,
  BarChart
} from 'lucide-react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const teamMembers: TeamMember[] = [
  {
    name: "Elena Rodriguez",
    role: "CEO & Co-Founder",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Michael Wei",
    role: "CTO & Co-Founder",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Sarah Johnson",
    role: "Chief Security Officer",
    image: "https://images.pexels.com/photos/3754208/pexels-photo-3754208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "David Okafor",
    role: "VP of Product",
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "Amira Hassan",
    role: "VP of Customer Success",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    name: "James Wilson",
    role: "Head of Engineering",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const milestones: MilestoneItem[] = [
  {
    year: "2018",
    title: "Company Founded",
    description: "Votera was founded with a mission to make secure voting accessible to organizations of all sizes."
  },
  {
    year: "2019",
    title: "First Major Client",
    description: "Partnered with Global University to run their student body elections, increasing turnout by 62%."
  },
  {
    year: "2020",
    title: "Remote Voting Solution",
    description: "Launched enhanced remote voting capabilities to help organizations maintain governance during global pandemic."
  },
  {
    year: "2021",
    title: "Security Certification",
    description: "Achieved ISO 27001 and SOC 2 Type II certification, setting new standards for voting security."
  },
  {
    year: "2022",
    title: "International Expansion",
    description: "Expanded to serve clients in 28 countries with multi-language support and regional compliance."
  },
  {
    year: "2023",
    title: "Enterprise Solution",
    description: "Launched Votera Enterprise with advanced customization, API access, and dedicated support."
  }
];

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      className="h-full"
    >
      <div className={cn(
        "p-8 h-full border border-gray-700 rounded-xl bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-300",
        "hover:shadow-[0_0_20px_rgba(12,242,160,0.1)] hover:border-[#0CF2A0]/30"
      )}>
        <div className="bg-[#0CF2A0]/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

const AboutPage: React.FC = () => {
  // Set page title
  React.useEffect(() => {
    document.title = 'About Us - Votera';
  }, []);

  return (
    <div className="pt-20 bg-[#111111]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-15"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
              Our Purpose
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Our Mission is to Make <span className="text-[#0CF2A0]">Democracy Accessible</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              At Votera, we're building the future of secure, transparent voting systems that empower organizations worldwide.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
                We're on a Mission to Transform How the World Votes
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                Votera was founded on a simple belief: voting should be secure, accessible, and transparent for everyone. Our team of security experts, engineers, and democracy advocates work together to build solutions that organizations can trust.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Whether it's a student council election, corporate board vote, or community organization poll, we provide the tools to make your voting process seamless and secure. Our platform is built on principles of integrity, accessibility, and innovation.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="border border-gray-700 rounded-xl overflow-hidden bg-gradient-to-br from-[#0CF2A0]/10 to-transparent p-1">
                <img 
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Team collaboration" 
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
              Our Team
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-400">
              The passionate individuals driving Votera's mission forward.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div 
                  className={cn(
                    "h-full border border-gray-700 rounded-xl bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-300 overflow-hidden",
                    "hover:shadow-[0_0_20px_rgba(12,242,160,0.1)] hover:border-[#0CF2A0]/30"
                  )}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#0CF2A0]">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              Key Milestones
            </h2>
            <p className="text-lg text-gray-400">
              The milestones that have shaped Votera's growth.
            </p>
          </motion.div>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 transform md:-translate-x-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative mb-12"
              >
                <div className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  <div className="md:w-1/2 flex justify-center md:justify-end md:pr-12 mb-6 md:mb-0">
                    <div className={`text-center md:text-right ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                      <div className="bg-[#0CF2A0] text-[#111111] text-xl font-medium px-4 py-2 rounded-lg inline-block mb-4">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 top-8 w-5 h-5 rounded-full bg-[#0CF2A0] border-4 border-[#111111] transform -translate-x-1/2 md:-translate-x-1/2"></div>
                  
                  <div className="md:w-1/2 md:pl-12">
                    {/* Empty div for spacing in the timeline */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Cards */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
              Our Principles
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-400">
              The principles that guide everything we do at Votera.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard
              icon={<Shield className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
              title="Security First"
              description="We believe security is non-negotiable. Every feature and product decision is evaluated through the lens of maintaining the highest security standards."
              delay={0.1}
            />
            
            <ValueCard
              icon={<Globe className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
              title="Accessible Democracy"
              description="We're committed to making voting accessible to everyone, regardless of location, ability, or technical expertise."
              delay={0.2}
            />
            
            <ValueCard
              icon={<Users className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
              title="User-Centered Design"
              description="We design our solutions with real users in mind, ensuring that every feature enhances the voting experience for administrators and voters alike."
              delay={0.3}
            />
            
            <ValueCard
              icon={<CheckCircle className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
              title="Integrity & Transparency"
              description="We operate with complete transparency and integrity in all our business practices and technology solutions."
              delay={0.4}
            />
            
            <ValueCard
              icon={<Clock className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
              title="Continuous Innovation"
              description="We constantly push the boundaries of what's possible in voting technology, investing heavily in research and development."
              delay={0.5}
            />
            
            <ValueCard
              icon={<BarChart className="h-7 w-7 text-[#0CF2A0]" strokeWidth={1.5} />}
              title="Data-Driven Decisions"
              description="We use data to inform our product decisions, helping organizations understand voting patterns and improve engagement."
              delay={0.6}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;