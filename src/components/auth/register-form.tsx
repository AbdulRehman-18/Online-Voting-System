import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, User, ChevronRight, AlertCircle, Building, MapPin, Car as IdCard } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/context/auth-store";
import { UserRole } from "@/lib/types";

export function RegisterForm() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "voter" as UserRole,
    // Role-specific fields
    partyAffiliation: "",
    electionId: "",
    voterId: "",
    address: "",
    employeeId: "",
    department: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const success = await register(formData);
      if (success) {
        navigate(`/dashboard/${formData.role}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const renderRoleSpecificFields = () => {
    switch (formData.role) {
      case "candidate":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="partyAffiliation">Party Affiliation</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="partyAffiliation"
                  name="partyAffiliation"
                  value={formData.partyAffiliation}
                  onChange={handleChange}
                  className="pl-10"
                  isNeumorphic
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="electionId">Election ID</Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="electionId"
                  name="electionId"
                  value={formData.electionId}
                  onChange={handleChange}
                  className="pl-10"
                  isNeumorphic
                  required
                />
              </div>
            </div>
          </>
        );
      case "voter":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="voterId">Voter ID</Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="voterId"
                  name="voterId"
                  value={formData.voterId}
                  onChange={handleChange}
                  className="pl-10"
                  isNeumorphic
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10"
                  isNeumorphic
                  required
                />
              </div>
            </div>
          </>
        );
      case "admin":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  className="pl-10"
                  isNeumorphic
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="pl-10"
                  isNeumorphic
                  required
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-none overflow-hidden glassmorphism">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-light text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Register for a new Votera account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="role">I am registering as a:</Label>
          <div className="grid grid-cols-3 gap-2">
            {(["voter", "candidate", "admin"] as UserRole[]).map((r) => (
              <Button
                key={r}
                type="button"
                variant={formData.role === r ? "default" : "outline"}
                className="capitalize"
                onClick={() => setFormData(prev => ({ ...prev, role: r }))}
              >
                {r === "voter" && <User className="mr-2 h-4 w-4" />}
                {r === "candidate" && <User className="mr-2 h-4 w-4" />}
                {r === "admin" && <User className="mr-2 h-4 w-4" />}
                {r}
              </Button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10"
                isNeumorphic
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
                isNeumorphic
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="pl-10"
                isNeumorphic
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10"
                isNeumorphic
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10"
                isNeumorphic
                required
              />
            </div>
          </div>

          {renderRoleSpecificFields()}

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
                Create Account <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-primary hover:text-primary/80"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}