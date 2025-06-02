import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, Zap } from 'lucide-react';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Dynamic rotating text component
const RotatingText = ({ texts }: { texts: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length);
    }, 2200);
    
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <span className="inline-block h-[1.2em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '110%', opacity: 0 }}
          transition={{ 
            type: "spring", 
            damping: 18, 
            stiffness: 250,
            staggerChildren: 0.01
          }}
          className="text-[#0CF2A0] mx-1 inline-block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

// Shiny text effect component
const ShinyText = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={cn("relative overflow-hidden inline-block", className)}>
    {text}
    <span className="shine-overlay"></span>
    <style>{`
  .shine-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: shine 2s infinite linear;
    opacity: 0.5;
    pointer-events: none;
  }
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`}</style>

  </span>
);

const HomeSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  // Interactive background setup
  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mousePositionRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }, []);

  // Background animation logic
  const animateBackground = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0d0f17');
    gradient.addColorStop(1, '#111827');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Interactive dots
    const DOT_SPACING = 25;
    const BASE_OPACITY_MIN = 0.40;
    const BASE_OPACITY_MAX = 0.50;
    const BASE_RADIUS = 1;
    const INTERACTION_RADIUS = 150;
    
    const cols = Math.ceil(width / DOT_SPACING);
    const rows = Math.ceil(height / DOT_SPACING);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2;
        const y = j * DOT_SPACING + DOT_SPACING / 2;
        
        let opacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
        let radius = BASE_RADIUS;
        
        // Mouse interaction
        if (mousePositionRef.current.x !== null && mousePositionRef.current.y !== null) {
          const dx = x - mousePositionRef.current.x;
          const dy = y - mousePositionRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < INTERACTION_RADIUS) {
            const factor = 1 - distance / INTERACTION_RADIUS;
            opacity = Math.min(1, opacity + factor * 0.6);
            radius = BASE_RADIUS + factor * 2.5;
          }
        }
        
        ctx.beginPath();
        ctx.fillStyle = `rgba(87, 220, 205, ${opacity})`;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    animationFrameId.current = requestAnimationFrame(animateBackground);
  }, []);

  useEffect(() => {
    // Canvas setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      animateBackground();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    animationFrameId.current = requestAnimationFrame(animateBackground);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animateBackground, handleMouseMove]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#111111] text-gray-300">
      {/* Interactive background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
      />
      <div className="absolute inset-0 z-1 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 0%, #111111 90%), radial-gradient(ellipse at center, transparent 40%, #111111 95%)'
      }}></div>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6"
        >
          <ShinyText 
            text="Trusted by 500+ organizations worldwide" 
            className="bg-[#1a1a1a] border border-gray-700 text-[#0CF2A0] px-4 py-1 rounded-full text-xs sm:text-sm font-medium" 
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl sm:text-5xl lg:text-[64px] font-semibold text-white leading-tight max-w-4xl mb-4"
        >
          Secure Democracy with <br />
          <span className="inline-block h-[1.2em] sm:h-[1.2em] lg:h-[1.2em] overflow-hidden align-bottom">
            <RotatingText
              texts={['Modern Voting', 'Election Integrity', 'Transparent Results', 'Verified Outcomes']}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Votera provides transparent, secure, and easy-to-use voting solutions for organizations of all sizes. With end-to-end encryption and real-time results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full max-w-md mx-auto mb-3"
        >
          
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto mb-10"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 flex items-center space-x-3"
          >
            <div className="bg-[#0CF2A0]/10 p-2 rounded-lg">
              <ShieldCheck className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">End-to-End Encryption</p>
              <p className="text-xs text-gray-400">Military-grade security</p>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 flex items-center space-x-3"
          >
            <div className="bg-[#0CF2A0]/10 p-2 rounded-lg">
              <Award className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Certified Results</p>
              <p className="text-xs text-gray-400">100% Verifiable</p>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-700 flex items-center space-x-3"
          >
            <div className="bg-[#0CF2A0]/10 p-2 rounded-lg">
              <Zap className="h-6 w-6 text-[#0CF2A0]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Lightning Fast</p>
              <p className="text-xs text-gray-400">Results in seconds</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto px-4 sm:px-0"
        >
          <div className="rounded-lg overflow-hidden shadow-xl border border-gray-700/50">
            <div className="bg-gray-800 h-8 flex items-center px-4 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-1">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="bg-gray-800/50 h-64 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-[#0CF2A0] text-lg font-medium mb-2">Live Election Dashboard</div>
                    <div className="text-gray-400 text-sm">Real-time results visualization</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default HomeSection;