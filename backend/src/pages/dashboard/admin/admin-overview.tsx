import { Users, VoteIcon, CalendarCheck, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";

import { StatCard } from "@/components/stats/stat-card";
import { ChartCard } from "@/components/stats/chart-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// TODO: Fetch real-time data from backend
const voterTurnoutData: { name: string; turnout: number }[] = [];
const activeElectionsData: { name: string; votes: number }[] = [];

// TODO: Fetch recent elections data from backend
const recentElections: Array<{
  id: string;
  title: string;
  status: "active" | "ended" | "upcoming";
  totalVotes: number;
  endDate: Date;
}> = [];

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-light tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">
            Welcome back to your election management dashboard.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="neumorphic">
            <VoteIcon className="mr-2 h-4 w-4" />
            Launch Election
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Registered Voters"
          value="2,546"
          icon={<Users className="h-4 w-4" />}
          description="Increased by"
          trend={12}
          delay={0.1}
        />
        <StatCard
          title="Active Elections"
          value="4"
          icon={<CalendarCheck className="h-4 w-4" />}
          description="2 ending this week"
          colorClass="text-accent"
          delay={0.2}
        />
        <StatCard
          title="Total Candidates"
          value="32"
          icon={<Award className="h-4 w-4" />}
          description="Across all elections"
          colorClass="text-success"
          delay={0.3}
        />
        <StatCard
          title="Voter Turnout"
          value="78%"
          icon={<TrendingUp className="h-4 w-4" />}
          description="Increased by"
          trend={5}
          colorClass="text-warning"
          delay={0.4}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Voter Turnout Trends"
          data={voterTurnoutData}
          dataKey="turnout"
          stroke="hsl(var(--primary))"
        />
        
        <ChartCard
          title="Active Elections"
          data={activeElectionsData}
          type="bar"
          dataKey="votes"
          stroke="hsl(var(--accent))"
        />
      </div>

      <Card isGlassmorphic className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Recent Elections</CardTitle>
          <CardDescription>
            Monitor and manage ongoing and upcoming elections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Title</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                  <th className="px-4 py-3 text-left font-medium">Candidates</th>
                  <th className="px-4 py-3 text-left font-medium">Voters</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentElections.map((election, index) => (
                  <motion.tr
                    key={election.id}
                    className="border-b last:border-b-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <td className="px-4 py-3">{election.title}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
                        election.status === "active" 
                          ? "bg-success/20 text-success" 
                          : "bg-warning/20 text-warning"
                      }`}>
                        {election.status === "active" ? "Active" : "Upcoming"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {election.endDate.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3">{election.totalVotes}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}