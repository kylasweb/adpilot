
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { name: "Jan 1", clicks: 1000, impressions: 4000, ctr: 2.5 },
  { name: "Jan 8", clicks: 1200, impressions: 4200, ctr: 2.8 },
  { name: "Jan 15", clicks: 1500, impressions: 5000, ctr: 3.0 },
  { name: "Jan 22", clicks: 1300, impressions: 4500, ctr: 2.9 },
  { name: "Jan 29", clicks: 1800, impressions: 6000, ctr: 3.0 },
  { name: "Feb 5", clicks: 2000, impressions: 6500, ctr: 3.1 },
  { name: "Feb 12", clicks: 1700, impressions: 5500, ctr: 3.1 },
];

const PerformanceChart = () => {
  const [period, setPeriod] = React.useState("7d");

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select defaultValue="7d" onValueChange={setPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="impressions"
            stroke="hsl(var(--secondary))"
            name="Impressions"
            activeDot={{ r: 8 }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="clicks"
            stroke="hsl(var(--primary))"
            name="Clicks"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ctr"
            stroke="hsl(var(--accent))"
            name="CTR (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
