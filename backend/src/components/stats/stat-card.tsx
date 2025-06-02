import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: number;
  colorClass?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon,
  description,
  trend,
  colorClass = "text-primary",
  delay = 0,
}: StatCardProps) {
  const isPositiveTrend = trend && trend > 0;
  
  return (
    <Card 
      isGlassmorphic 
      delay={delay}
      className="border-none shadow-lg overflow-hidden"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <motion.div 
          className={cn("p-2 rounded-full", colorClass)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: "spring" }}
        >
          {icon}
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="text-2xl font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.1 }}
        >
          {value}
        </motion.div>
        
        {(description || trend) && (
          <motion.p 
            className="text-xs text-muted-foreground mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {description}
            {trend && (
              <span
                className={cn(
                  "ml-1",
                  isPositiveTrend ? "text-success" : "text-destructive"
                )}
              >
                {isPositiveTrend ? "+" : ""}
                {trend}%
              </span>
            )}
          </motion.p>
        )}
      </CardContent>
    </Card>
  );
}