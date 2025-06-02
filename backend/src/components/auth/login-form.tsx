import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/context/auth-store";
import { UserRole } from "@/lib/types";

export function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("voter");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !password || !role) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      const success = await login(email, password, role);
      
      if (success) {
        navigate(`/dashboard/${role}`);
      } else {
        setError("Invalid email, password, or role. Please try again.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-none overflow-hidden glassmorphism">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-light text-center">Sign in to Votera</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="role">I am a:</Label>
          <div className="grid grid-cols-3 gap-2">
            {(["voter", "candidate", "admin"] as UserRole[]).map((r) => (
              <Button
                key={r}
                type="button"
                variant={role === r ? "default" : "outline"}
                className="capitalize"
                onClick={() => setRole(r)}
              >
                {r === "voter" && <User className="mr-2 h-4 w-4" />}
                {r === "candidate" && <User className="mr-2 h-4 w-4" />}
                {r === "admin" && <User className="mr-2 h-4 w-4" />}
                {r}
              </Button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                isNeumorphic
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                isNeumorphic
                required
              />
            </div>
          </div>
          
          <Button
            type="submit"
            className="w-full"
            variant="neumorphic"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                className="h-5 w-5 rounded-full border-2 border-current border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                Sign in <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm text-muted-foreground mt-2">
          <span>Demo accounts:</span>
          <div className="flex flex-col gap-1 mt-2 text-xs">
            <code className="px-2 py-1 bg-muted rounded">admin@votera.com</code>
            <code className="px-2 py-1 bg-muted rounded">candidate@votera.com</code>
            <code className="px-2 py-1 bg-muted rounded">voter@votera.com</code>
            <span className="mt-1">(use any password)</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}