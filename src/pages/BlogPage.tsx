import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, User, ChevronRight } from 'lucide-react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Digital Democracy: How Technology is Transforming Voting",
    excerpt: "Explore how blockchain, encryption, and mobile technology are making voting more secure and accessible than ever before.",
    date: "June 15, 2023",
    author: "Elena Rodriguez",
    category: "Technology",
    image: "https://images.pexels.com/photos/5696007/pexels-photo-5696007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true
  },
  {
    id: 2,
    title: "5 Ways to Increase Voter Turnout in Your Organization",
    excerpt: "Practical strategies to boost participation rates in your next election, from communication tips to technological solutions.",
    date: "May 22, 2023",
    author: "Michael Wei",
    category: "Best Practices",
    image: "https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    title: "Securing the Vote: Understanding End-to-End Encryption",
    excerpt: "A deep dive into how end-to-end encryption works and why it's essential for maintaining the integrity of online voting systems.",
    date: "April 10, 2023",
    author: "Sarah Johnson",
    category: "Security",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 4,
    title: "Case Study: How Global University Increased Student Participation by 68%",
    excerpt: "An in-depth look at how one of the largest universities in the country transformed their student government elections.",
    date: "March 28, 2023",
    author: "David Okafor",
    category: "Case Studies",
    image: "https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 5,
    title: "The Psychology of Voting: Why People Participate (or Don't)",
    excerpt: "Understanding the psychological factors that drive voter participation can help you design more engaging election experiences.",
    date: "February 15, 2023",
    author: "Amira Hassan",
    category: "Research",
    image: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 6,
    title: "Designing Accessible Ballots: Best Practices for Inclusivity",
    excerpt: "Learn how to create voting experiences that are accessible to all users, including those with disabilities or language barriers.",
    date: "January 30, 2023",
    author: "James Wilson",
    category: "Accessibility",
    image: "https://images.pexels.com/photos/3845126/pexels-photo-3845126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

const categories = [
  "All",
  "Technology",
  "Security",
  "Best Practices",
  "Case Studies",
  "Research",
  "Accessibility"
];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Set page title
  React.useEffect(() => {
    document.title = 'Blog - Votera';
  }, []);

  const filteredPosts = activeCategory === "All"
    ? blogPosts.filter(post => !post.featured)
    : blogPosts.filter(post => post.category === activeCategory && !post.featured);
  
  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <div className="pt-20 bg-[#111111]">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0CF2A0]/10 to-[#111111] opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
              Insights & Trends
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Votera Blog
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Insights, trends, and best practices in digital democracy and secure voting systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-15"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16"
            >
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-6">
                <span className="text-[#0CF2A0]">Featured</span> Article
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm mb-6">
                  {featuredPost.category}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-6">
                  {featuredPost.title}
                </h3>
                
                <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center space-x-8 mb-10">
                  <div className="flex items-center text-gray-400">
                    <CalendarDays className="h-5 w-5 mr-2 text-[#0CF2A0]" strokeWidth={1.5} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <User className="h-5 w-5 mr-2 text-[#0CF2A0]" strokeWidth={1.5} />
                    <span>{featuredPost.author}</span>
                  </div>
                </div>
                
                <motion.a
                  href="#"
                  className="group inline-flex items-center text-[#0CF2A0] font-medium"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  Read Article
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="border border-gray-700 rounded-xl overflow-hidden">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#111111] to-[#0a0a0a] opacity-80"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-15"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-6 md:mb-0">
              <span className="text-[#0CF2A0]">Latest</span> Articles
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    activeCategory === category
                      ? 'bg-[#0CF2A0] text-[#111111]'
                      : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#1f1f1f]'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={cn(
                  "h-full border border-gray-700 rounded-xl bg-[#1a1a1a] hover:bg-[#1f1f1f] transition-all duration-300",
                  "overflow-hidden",
                  "hover:shadow-[0_0_20px_rgba(12,242,160,0.1)] hover:border-[#0CF2A0]/30"
                )}>
                  <div className="relative h-48">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <CalendarDays className="h-4 w-4 mr-2 text-[#0CF2A0]" strokeWidth={1.5} />
                        <span>{post.date}</span>
                      </div>
                      
                      <motion.a
                        href="#"
                        className="group inline-flex items-center text-[#0CF2A0] text-sm font-medium"
                        whileHover={{ x: 5 }}
                      >
                        Read More
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <motion.button
              className="px-6 py-3 rounded-lg bg-[#0CF2A0] text-[#111111] font-semibold hover:bg-opacity-90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Articles
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0CF2A0]/10 to-[#111111] opacity-30"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#0CF2A0]/10 blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-4 rounded-full bg-[#0CF2A0]/10 text-[#0CF2A0] text-sm font-medium">
              Stay Updated
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white mb-6">
              Get the Latest Insights
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Get the latest articles, case studies, and updates on digital voting technology delivered to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#0CF2A0] focus:border-transparent"
              />
              <motion.button
                type="submit"
                className="px-6 py-3 rounded-lg bg-[#0CF2A0] text-[#111111] font-semibold hover:bg-opacity-90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;