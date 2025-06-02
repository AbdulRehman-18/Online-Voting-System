import { motion } from "framer-motion";
import { Award, BarChart3, Calendar, Users } from "lucide-react";

import { StatCard } from "@/components/stats/stat-card";
import { ChartCard } from "@/components/stats/chart-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/context/auth-store";
import { getInitials } from "@/lib/utils";

// TODO: Fetch real-time data from backend
const voteData: { name: string; votes: number }[] = [];
const supporterActivityData: { name: string; activity: number }[] = [];



const upcomingEvents = [
  { id: "ev1", title: "Candidate Debate", date: new Date(2025, 2, 18), location: "Main Auditorium", time: "14:00 - 16:00" },
  { id: "ev2", title: "Campaign Rally", date: new Date(2025, 2, 20), location: "Central Park", time: "10:00 - 12:00" },
  { id: "ev3", title: "Town Hall Meeting", date: new Date(2025, 2, 22), location: "Community Center", time: "18:00 - 19:30" },
];

export function CandidateOverview() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight">Campaign Dashboard</h2>
          <p className="text-muted-foreground">
            Track your campaign performance and upcoming events
          </p>
        </div>
        <Button variant="neumorphic">
          <Calendar className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Profile Card */}
      <Card isGlassmorphic className="border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="h-24 w-24 border-2 border-primary">
              {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
              <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-light mb-1">{user.name}</h3>
              <p className="text-muted-foreground mb-4">Candidate for Student Council President</p>
              
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Leadership
                </span>
                <span className="inline-flex items-center rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
                  Education Reform
                </span>
                <span className="inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-medium text-success">
                  Campus Improvement
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-2xl font-light">405</p>
                <p className="text-xs text-muted-foreground">Votes</p>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-2xl font-light">68%</p>
                <p className="text-xs text-muted-foreground">Approval</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Votes"
          value="405"
          icon={<Award className="h-4 w-4" />}
          description="Increased by"
          trend={12}
          delay={0.1}
        />
        <StatCard
          title="Supporters"
          value="624"
          icon={<Users className="h-4 w-4" />}
          description="Increased by"
          trend={8}
          colorClass="text-accent"
          delay={0.2}
        />
        <StatCard
          title="Campaign Days Left"
          value="8"
          icon={<Calendar className="h-4 w-4" />}
          description="Election ends Mar 20"
          colorClass="text-warning"
          delay={0.3}
        />
        <StatCard
          title="Position in Poll"
          value="1st"
          icon={<BarChart3 className="h-4 w-4" />}
          description="Leading by 56 votes"
          colorClass="text-success"
          delay={0.4}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Vote Accumulation"
          data={voteData}
          dataKey="votes"
          stroke="hsl(var(--primary))"
        />
        
        <ChartCard
          title="Supporter Activity"
          data={supporterActivityData}
          type="bar"
          dataKey="activity"
          stroke="hsl(var(--accent))"
        />
      </div>

      <Card isGlassmorphic className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>
            Your scheduled campaign activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex items-start p-4 rounded-lg bg-secondary/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="mr-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {event.date.toLocaleDateString()} • {event.time}
                  </p>
                  <p className="text-sm">{event.location}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Details
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}