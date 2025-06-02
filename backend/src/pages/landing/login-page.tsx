import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LoginForm } from "@/components/auth/login-form";

export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="https://api.dicebear.com/7.x/shapes/svg?seed=votera" 
            alt="Votera Logo"
            className="h-8 w-8"
          />
          <h1 className="text-2xl font-light">Votera</h1>
        </div>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-12">
        <motion.div 
          className="max-w-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Secure Online <span className="text-primary">Voting</span> System
          </h1>
          <p className="text-lg text-foreground/70 mb-8">
            A transparent and secure platform for conducting elections with real-time results and analytics.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <h3 className="font-medium">Secure</h3>
              <p className="text-sm text-foreground/70">End-to-end encryption</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <h3 className="font-medium">Transparent</h3>
              <p className="text-sm text-foreground/70">Real-time results</p>
            </div>
            <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <h3 className="font-medium">Accessible</h3>
              <p className="text-sm text-foreground/70">Vote from anywhere</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginForm />
        </motion.div>
      </main>
      
      <footer className="p-4 text-center text-sm text-foreground/60">
        &copy; 2025 Votera. All rights reserved.
      </footer>
    </div>
  );
}