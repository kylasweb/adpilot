
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { date: "Jan 1", impressions: 320000, clicks: 8400, conversions: 560 },
  { date: "Jan 8", impressions: 340000, clicks: 9200, conversions: 670 },
  { date: "Jan 15", impressions: 380000, clicks: 9800, conversions: 720 },
  { date: "Jan 22", impressions: 420000, clicks: 10100, conversions: 780 },
  { date: "Jan 29", impressions: 410000, clicks: 10500, conversions: 810 },
  { date: "Feb 5", impressions: 450000, clicks: 11200, conversions: 890 },
  { date: "Feb 12", impressions: 470000, clicks: 12000, conversions: 950 },
];

const barData = [
  { name: "Summer Sale", value: 3.8 },
  { name: "Brand Awareness", value: 2.1 },
  { name: "Product Launch", value: 4.2 },
  { name: "Retargeting", value: 5.6 },
  { name: "Conversion", value: 3.2 },
];

const pieData = [
  { name: "Facebook Feed", value: 45 },
  { name: "Instagram Stories", value: 25 },
  { name: "Facebook Stories", value: 10 },
  { name: "Instagram Feed", value: 20 },
];

const COLORS = ["#4F46E5", "#6366F1", "#8B5CF6", "#A78BFA"];

const PerformanceOverview = ({ dateRange }: { dateRange: string }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">Impressions</h3>
            <div className="text-2xl font-bold mt-2">3.2M</div>
            <p className="text-xs text-green-600 mt-1">↑ 12.3% vs. prev. period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">Clicks</h3>
            <div className="text-2xl font-bold mt-2">87.4K</div>
            <p className="text-xs text-green-600 mt-1">↑ 8.7% vs. prev. period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">CTR</h3>
            <div className="text-2xl font-bold mt-2">2.73%</div>
            <p className="text-xs text-red-600 mt-1">↓ 0.5% vs. prev. period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-adpilot-text-secondary">Conversions</h3>
            <div className="text-2xl font-bold mt-2">5,234</div>
            <p className="text-xs text-green-600 mt-1">↑ 15.2% vs. prev. period</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Performance Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={lineData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="impressions"
                  stroke="#4F46E5"
                  name="Impressions"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="clicks"
                  stroke="#8B5CF6"
                  name="Clicks"
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  stroke="#10B981"
                  name="Conversions"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Ad Placement Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">ROAS by Campaign</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={barData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}x`, "ROAS"]} />
              <Legend />
              <Bar dataKey="value" name="ROAS (Return on Ad Spend)" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceOverview;
