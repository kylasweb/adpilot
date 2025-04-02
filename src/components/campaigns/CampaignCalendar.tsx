
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

const CampaignCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // Campaign data to display on calendar
  const campaignDates = [
    { 
      date: new Date(2023, 5, 1), // June 1, 2023
      title: "Summer Sale 2023",
      type: "start"
    },
    { 
      date: new Date(2023, 6, 31), // July 31, 2023
      title: "Summer Sale 2023",
      type: "end"
    },
    { 
      date: new Date(2023, 6, 1), // July 1, 2023
      title: "Brand Awareness Q3",
      type: "start"
    },
    { 
      date: new Date(2023, 8, 30), // September 30, 2023
      title: "Brand Awareness Q3",
      type: "end"
    },
    { 
      date: new Date(2023, 7, 15), // August 15, 2023
      title: "Product Launch - Pro Series",
      type: "start"
    },
    { 
      date: new Date(2023, 8, 15), // September 15, 2023
      title: "Product Launch - Pro Series",
      type: "end"
    }
  ];
  
  const getCampaignsForDate = (day: Date) => {
    return campaignDates.filter(campaign => 
      campaign.date.toDateString() === day.toDateString()
    );
  };

  return (
    <div className="flex flex-col space-y-4">
      <Card className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            campaign: (date) => getCampaignsForDate(date).length > 0,
          }}
          modifiersClassNames={{
            campaign: "bg-adpilot-primary text-white font-bold",
          }}
        />
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Events for {date?.toDateString()}</h3>
          <div className="space-y-3">
            {date && getCampaignsForDate(date).length > 0 ? (
              getCampaignsForDate(date).map((campaign, index) => (
                <div key={index} className="bg-adpilot-muted p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{campaign.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      campaign.type === "start" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {campaign.type === "start" ? "Start Date" : "End Date"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-adpilot-text-muted text-center py-4">No campaigns scheduled for this date.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignCalendar;
