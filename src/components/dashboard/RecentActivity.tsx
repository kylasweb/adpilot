
import React from "react";
import { Calendar, Edit, Plus, Users } from "lucide-react";

const activityData = [
  {
    id: 1,
    action: "Campaign Created",
    target: "Summer Sale 2023",
    user: "John Smith",
    time: "1 hour ago",
    icon: Plus,
    iconClass: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    action: "Cohort Updated",
    target: "High-Value Customers",
    user: "Sara Johnson",
    time: "3 hours ago",
    icon: Users,
    iconClass: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    action: "Campaign Edited",
    target: "Brand Awareness Q3",
    user: "Mike Davis",
    time: "5 hours ago",
    icon: Edit,
    iconClass: "bg-amber-100 text-amber-600",
  },
  {
    id: 4,
    action: "Schedule Updated",
    target: "Product Launch",
    user: "Lisa Wong",
    time: "1 day ago",
    icon: Calendar,
    iconClass: "bg-purple-100 text-purple-600",
  },
];

const RecentActivity = () => {
  return (
    <div className="space-y-4">
      {activityData.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <div className={`${item.iconClass} p-2 rounded-full`}>
            <item.icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {item.action}
              <span className="font-normal text-adpilot-text-secondary"> - {item.target}</span>
            </p>
            <div className="flex items-center gap-1 mt-1">
              <p className="text-xs text-adpilot-text-muted">{item.user}</p>
              <span className="text-xs text-adpilot-text-muted">•</span>
              <p className="text-xs text-adpilot-text-muted">{item.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
