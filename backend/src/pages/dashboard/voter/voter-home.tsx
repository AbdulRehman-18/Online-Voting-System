import { motion } from "framer-motion";
import { Calendar, ChevronRight, Vote } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

// TODO: Fetch elections data from backend
const upcomingElections: Array<{
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "ended";
}> = [
];

const featuredCandidates = [
  {
    id: "c1",
    name: "Alex Johnson",
    position: "Student Council President",
    bio: "Fighting for better campus facilities and student rights",
    avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Leadership", "Campus Improvement"]
  },
  {
    id: "c2",
    name: "Samantha Lee",
    position: "Student Council Vice President",
    bio: "Advocating for inclusive education and diversity initiatives",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Diversity", "Education Reform"]
  },
  {
    id: "c3",
    name: "Michael Chen",
    position: "Treasurer",
    bio: "Experienced in financial management and budget allocation",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Finance", "Transparency"]
  },
];

export function VoterHome() {
  // Calculate time remaining for the closest active election
  const activeElection = upcomingElections.find(e => e.status === "active");
  const timeRemaining = activeElection ? Math.floor((activeElection.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-light tracking-tight">Welcome Voter</h2>
        <p className="text-muted-foreground">
          Your voice matters. Make it count by participating in active elections.
        </p>
      </div>

      {activeElection && (
        <Card isGlassmorphic className="border-none shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg z-0" />
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-primary/20 p-4 rounded-full">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-light mb-1">{activeElection.title}</h3>
                <p className="text-muted-foreground mb-1">{activeElection.description}</p>
                <p className="text-sm">
                  <span className="inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-medium text-success">
                    Active
                  </span>
                  <span className="ml-2">
                    {activeElection.startDate.toLocaleDateString()} - {activeElection.endDate.toLocaleDateString()}
                  </span>
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Time Remaining</p>
                <p className="text-3xl font-light">{timeRemaining} <span className="text-lg">days</span></p>
                <Button className="mt-2" variant="neumorphic">
                  <Vote className="mr-2 h-4 w-4" />
                  Vote Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card isGlassmorphic className="border-none shadow-lg h-full">
            <CardHeader>
              <CardTitle>Featured Candidates</CardTitle>
              <CardDescription>
                Learn more about the candidates before casting your vote
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {featuredCandidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    className="flex flex-col p-4 rounded-lg bg-background/50 border"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar>
                        {candidate.avatar && <AvatarImage src={candidate.avatar} alt={candidate.name} />}
                        <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-medium">{candidate.name}</h4>
                        <p className="text-xs text-muted-foreground">{candidate.position}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground flex-1">{candidate.bio}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {candidate.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-3 self-end">
                      View Profile
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card isGlassmorphic className="border-none shadow-lg h-full">
            <CardHeader>
              <CardTitle>Upcoming Elections</CardTitle>
              <CardDescription>
                Elections you can participate in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingElections.map((election, index) => (
                  <motion.div
                    key={election.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/20 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div>
                      <div className="flex items-center">
                        <h4 className="text-sm font-medium">{election.title}</h4>
                        <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                          election.status === "active" 
                            ? "bg-success/20 text-success" 
                            : "bg-warning/20 text-warning"
                        }`}>
                          {election.status === "active" ? "Active" : "Upcoming"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {election.startDate.toLocaleDateString()} - {election.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Elections
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}