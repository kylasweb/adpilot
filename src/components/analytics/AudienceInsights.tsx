
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ageData = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55-64", value: 8 },
  { name: "65+", value: 2 },
];

const genderData = [
  { name: "Male", value: 42 },
  { name: "Female", value: 56 },
  { name: "Other", value: 2 },
];

const deviceData = [
  { name: "Mobile", value: 68 },
  { name: "Desktop", value: 24 },
  { name: "Tablet", value: 8 },
];

const interestData = [
  { name: "Technology", value: 30 },
  { name: "Fashion", value: 20 },
  { name: "Health & Fitness", value: 15 },
  { name: "Travel", value: 12 },
  { name: "Home & Garden", value: 8 },
  { name: "Food & Drink", value: 15 },
];

const COLORS = ["#4F46E5", "#6366F1", "#8B5CF6", "#A78BFA", "#C084FC", "#E879F9"];
const GENDER_COLORS = ["#4F46E5", "#EC4899", "#8B5CF6"];
const DEVICE_COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

const AudienceInsights = ({ dateRange }: { dateRange: string }) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Age Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={ageData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
                <Bar dataKey="value" name="Percentage" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Device Usage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Interest Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                layout="vertical"
                data={interestData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit="%" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend />
                <Bar dataKey="value" name="Percentage" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Audience Insights Summary</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Key Demographics</h4>
              <ul className="list-disc pl-5 space-y-1 text-adpilot-text-secondary">
                <li>Core audience: 25-44 year olds (60%)</li>
                <li>Slightly female skewed (56%)</li>
                <li>Predominantly mobile users (68%)</li>
                <li>Technology and Fashion are top interests</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Recommendations</h4>
              <ul className="list-disc pl-5 space-y-1 text-adpilot-text-secondary">
                <li>Optimize creative for mobile-first experience</li>
                <li>Create age-specific messaging for 25-34 demographic</li>
                <li>Develop tech-focused content to leverage interest area</li>
                <li>Consider female-oriented creative variants</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudienceInsights;
