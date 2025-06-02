import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Utility function for class merging
function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Built-in UI Components
const Button = ({ 
  children, 
  variant = "default", 
  className = "", 
  type = "button",
  onClick,
  ...props 
}: {
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-gray-500"
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`w-full px-3 py-2 text-sm bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

const Label = ({ children, htmlFor, className = "" }: { 
  children: React.ReactNode; 
  htmlFor?: string; 
  className?: string 
}) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-300 mb-1 ${className}`}
  >
    {children}
  </label>
);

const Checkbox = ({ id, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type="checkbox"
    id={id}
    className={`w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Dialog = ({ 
  children, 
  open, 
  onOpenChange 
}: { 
  children: React.ReactNode; 
  open: boolean; 
  onOpenChange: (open: boolean) => void 
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {children}
      </div>
    </div>
  );
};

const DialogTrigger = ({ 
  children, 
  onClick 
}: { 
  children: React.ReactElement; 
  onClick: () => void 
}) => {
  return React.cloneElement(children, { onClick });
};

const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children, className = "" }: { 
  children: React.ReactNode; 
  className?: string 
}) => (
  <h2 className={`text-lg font-semibold text-white ${className}`}>
    {children}
  </h2>
);

const DialogDescription = ({ children, className = "" }: { 
  children: React.ReactNode; 
  className?: string 
}) => (
  <p className={`text-sm text-gray-400 mt-1 ${className}`}>
    {children}
  </p>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  // Improved dropdown handlers with timeout for better UX
  const handleDropdownEnter = (dropdown: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150); // Small delay to allow moving to dropdown
  };

  // NavLink component for consistent styling
  const NavLink = ({ 
    to, 
    children,
    hasDropdown = false,
    className = ""
  }: {
    to: string;
    children: React.ReactNode;
    hasDropdown?: boolean;
    className?: string;
  }) => (
    <Link
      to={to}
      className={cn(
        "relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center py-1",
        isActiveLink(to) && "text-white",
        className
      )}
      onClick={closeMobileMenu}
    >
      {children}
      {hasDropdown && <ChevronDown className="w-3 h-3 ml-1 inline-block transition-transform duration-200 group-hover:rotate-180" />}
      
      {!hasDropdown && (
        <motion.div
          className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#0CF2A0]"
          variants={{ 
            initial: { scaleX: 0, originX: 0.5 }, 
            hover: { scaleX: 1, originX: 0.5 } 
          }}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </Link>
  );

  // Dropdown components for mobile and desktop
  const DropdownMenu = ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 mt-1 w-48 origin-top z-40"
          onMouseEnter={() => {
            if (dropdownTimeoutRef.current) {
              clearTimeout(dropdownTimeoutRef.current);
            }
          }}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="bg-[#111111] border border-gray-700/50 rounded-md shadow-xl p-2 backdrop-blur-sm">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const DropdownItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link
      to={to}
      className="group flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/30 hover:text-white rounded-md transition-colors duration-150"
      onClick={closeMobileMenu}
    >
      {children}
    </Link>
  );

  // Mobile dropdown component
  const MobileDropdownSection = ({ 
    title, 
    children 
  }: { 
    title: string; 
    children: React.ReactNode 
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
        >
          {title}
          <ChevronDown className={cn(
            "w-3 h-3 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pl-4"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const SignInDialog = () => (
    <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gray-600"
            aria-hidden="true"
          >
            <svg
              className="stroke-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center">Welcome back</DialogTitle>
            <DialogDescription className="text-center">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="hi@yourcompany.com" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="font-normal text-gray-400">
                Remember me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline text-blue-400" href="#">
              Forgot password?
            </a>
          </div>
          <Button type="button" className="w-full">
            Sign in
          </Button>
        </div>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-gray-600 after:h-px after:flex-1 after:bg-gray-600">
          <span className="text-xs text-gray-400">Or</span>
        </div>

        <Button variant="outline" className="w-full">Login with Google</Button>
      </DialogContent>
    </Dialog>
  );

  const SignUpDialog = () => (
    <Dialog open={isSignUpDialogOpen} onOpenChange={setIsSignUpDialogOpen}>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gray-600"
            aria-hidden="true"
          >
            <svg
              className="stroke-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="text-center">Create Your Account</DialogTitle>
            <DialogDescription className="text-center">
              Join our community with a secure sign up
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-5">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" placeholder="hi@yourcompany.com" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                placeholder="Create a password"
                type="password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                placeholder="Confirm your password"
                type="password"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="font-normal text-gray-400">
              I agree to the <a href="#" className="underline hover:no-underline text-blue-400">Terms of Service</a> and <a href="#" className="underline hover:no-underline text-blue-400">Privacy Policy</a>
            </Label>
          </div>
          <Button type="button" className="w-full bg-[#0CF2A0] text-[#111111] hover:bg-[#0CF2A0]/90">
            Create Account
          </Button>
        </div>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-gray-600 after:h-px after:flex-1 after:bg-gray-600">
          <span className="text-xs text-gray-400">Or</span>
        </div>

        <Button variant="outline" className="w-full">Sign up with Google</Button>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <motion.header
        initial={{ backgroundColor: "rgba(17, 17, 17, 0.8)" }}
        animate={isScrolled ? { 
          backgroundColor: "rgba(17, 17, 17, 0.95)",
          borderBottomColor: "rgba(75, 85, 99, 0.7)",
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        } : {}}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="px-6 w-full md:px-10 lg:px-16 sticky top-0 z-30 backdrop-blur-md border-b border-gray-700"
      >
        <div className="container mx-auto max-w-screen-xl h-[70px] flex items-center justify-between">
          <Link to="/" className="flex items-center flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" 
                    stroke="#0CF2A0" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="rgba(12, 242, 160, 0.1)"/>
              <path d="M2 12L12 17L22 12" 
                    stroke="#0CF2A0" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill="rgba(12, 242, 160, 0.05)"/>
              <path d="M2 17L12 22L22 17" 
                    stroke="#0CF2A0" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
              <path d="M12 12L12 17" 
                    stroke="#0CF2A0" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    opacity="0.6"/>
              <path d="M12 17L12 22" 
                    stroke="#0CF2A0" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    opacity="0.6"/>
              <circle cx="2" cy="7" r="1.5" fill="#0CF2A0" opacity="0.8"/>
              <circle cx="22" cy="7" r="1.5" fill="#0CF2A0" opacity="0.8"/>
              <circle cx="12" cy="7" r="2" fill="none" stroke="#0CF2A0" strokeWidth="1" opacity="0.4"/>
            </svg>
            <span className="text-xl font-bold text-white ml-2">Votera</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-grow space-x-6 lg:space-x-8 px-4">
            <NavLink to="/" >
              Home
            </NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">
              Contact
            </NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <DialogTrigger onClick={() => setIsLoginDialogOpen(true)}>
              <button className="hidden md:inline-block text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 py-1">
                Log in
              </button>
            </DialogTrigger>
            
            <DialogTrigger onClick={() => setIsSignUpDialogOpen(true)}>
              <motion.button
                className="bg-[#0CF2A0] text-[#111111] px-4 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors duration-200 whitespace-nowrap shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Secure Sign Up
              </motion.button>
            </DialogTrigger>
            
            <motion.button
              className="md:hidden text-gray-300 hover:text-white z-50 relative"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-[#111111]/95 backdrop-blur-sm shadow-lg py-4 border-t border-gray-800/50"
            >
              <div className="flex flex-col space-y-2 px-6">
                <MobileDropdownSection title="Product">
                  <div className="space-y-1 py-2">
                    <NavLink to="/product" className="block px-3 py-2">Overview</NavLink>
                    <NavLink to="/features" className="block px-3 py-2">Features</NavLink>
                    <NavLink to="/integrations" className="block px-3 py-2">Integrations</NavLink>
                    <NavLink to="/security" className="block px-3 py-2">Security</NavLink>
                  </div>
                </MobileDropdownSection>
                
                <NavLink to="/solutions" className="px-3 py-2">Solutions</NavLink>
                
                <MobileDropdownSection title="Resources">
                  <div className="space-y-1 py-2">
                    <NavLink to="/blog" className="block px-3 py-2">Blog</NavLink>
                    <NavLink to="/guides" className="block px-3 py-2">Guides</NavLink>
                    <NavLink to="/docs" className="block px-3 py-2">Documentation</NavLink>
                    <NavLink to="/api" className="block px-3 py-2">API</NavLink>
                  </div>
                </MobileDropdownSection>
                
                <NavLink to="/pricing" className="px-3 py-2">Pricing</NavLink>
                
                <hr className="border-t border-gray-700/50 my-2"/>
                
                <DialogTrigger onClick={() => { setIsLoginDialogOpen(true); closeMobileMenu(); }}>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-300 hover:text-white">
                    Sign in
                  </button>
                </DialogTrigger>
                
                <div className="pt-2">
                  <DialogTrigger onClick={() => { setIsSignUpDialogOpen(true); closeMobileMenu(); }}>
                    <motion.button
                      className="block w-full bg-[#0CF2A0] text-[#111111] px-4 py-3 rounded-md text-sm font-semibold text-center hover:bg-opacity-90 transition-colors duration-200 shadow-sm hover:shadow-md"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Secure Sign Up
                    </motion.button>
                  </DialogTrigger>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Dialogs */}
      <SignInDialog />
      <SignUpDialog />
    </>
  );
};

export default Navbar;