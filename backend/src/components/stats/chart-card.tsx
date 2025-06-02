import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  data: any[];
  type?: "area" | "bar";
  dataKey: string;
  stroke?: string;
  fill?: string;
  xAxisDataKey?: string;
  className?: string;
  height?: number;
  children?: ReactNode;
}

export function ChartCard({
  title,
  data,
  type = "area",
  dataKey,
  stroke = "hsl(var(--primary))",
  fill = "rgba(59, 130, 246, 0.2)",
  xAxisDataKey = "name",
  className,
  height = 300,
  children,
}: ChartCardProps) {
  return (
    <Card isGlassmorphic className={cn("border-none shadow-lg h-full", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-light">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === "area" ? (
              <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={stroke} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={stroke} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey={xAxisDataKey} 
                  className="text-xs text-muted-foreground" 
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis className="text-xs text-muted-foreground" tick={{ fill: 'currentColor' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }} 
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={stroke}
                  fillOpacity={1}
                  fill={`url(#gradient-${title})`}
                />
              </AreaChart>
            ) : (
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey={xAxisDataKey} 
                  className="text-xs text-muted-foreground" 
                  tick={{ fill: 'currentColor' }}
                />
                <YAxis className="text-xs text-muted-foreground" tick={{ fill: 'currentColor' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '0.5rem',
                  }} 
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey={dataKey} fill={stroke} radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}