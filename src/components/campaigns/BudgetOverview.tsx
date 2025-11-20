
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Summer Sale 2023",
    allocated: 5000,
    spent: 2187.65,
    remaining: 2812.35,
  },
  {
    name: "Brand Awareness Q3",
    allocated: 3500,
    spent: 1652.43,
    remaining: 1847.57,
  },
  {
    name: "Product Launch",
    allocated: 2000,
    spent: 987.21,
    remaining: 1012.79,
  },
  {
    name: "Holiday Promotion",
    allocated: 8000,
    spent: 0,
    remaining: 8000,
  },
  {
    name: "Retargeting",
    allocated: 1200,
    spent: 876.54,
    remaining: 323.46,
  },
];

const BudgetOverview = () => {
  const [period, setPeriod] = React.useState("current");

  const totalAllocated = data.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
  const spentPercentage = (totalSpent / totalAllocated) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Budget Allocation</h3>
        <Select defaultValue="current" onValueChange={setPeriod}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Month</SelectItem>
            <SelectItem value="q3">Q3 2023</SelectItem>
            <SelectItem value="q4">Q4 2023</SelectItem>
            <SelectItem value="year">Full Year 2023</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <h4 className="text-sm font-medium text-adsilo-text-secondary">Total Budget</h4>
            <div className="text-3xl font-bold mt-2">${totalAllocated.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-sm font-medium text-adsilo-text-secondary">Total Spent</h4>
            <div className="text-3xl font-bold mt-2">${totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h4 className="text-sm font-medium text-adsilo-text-secondary">Remaining</h4>
            <div className="text-3xl font-bold mt-2">${(totalAllocated - totalSpent).toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h4 className="text-sm font-medium text-adsilo-text-secondary mb-4">Budget by Campaign</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
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
              <Tooltip />
              <Legend />
              <Bar dataKey="spent" name="Spent" fill="hsl(var(--primary))" />
              <Bar dataKey="remaining" name="Remaining" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetOverview;
