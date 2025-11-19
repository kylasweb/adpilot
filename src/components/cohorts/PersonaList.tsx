
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Copy, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const personas = [
  {
    id: 1,
    name: "Tech-Savvy Sarah",
    description: "25-34 year old urban professional interested in technology",
    characteristics: ["Early adopter", "Mobile-first", "High income", "Frequent social media user"],
    avatar: "👩🏽‍💻",
  },
  {
    id: 2,
    name: "Family-First Fred",
    description: "35-44 year old suburban parent focused on family needs",
    characteristics: ["Value-conscious", "Family-oriented", "Convenience-seeking", "Weekend shopper"],
    avatar: "👨🏻‍👩🏻‍👧🏻‍👦🏻",
  },
  {
    id: 3,
    name: "Eco-Conscious Emma",
    description: "22-29 year old environmentally conscious millennial",
    characteristics: ["Sustainable focus", "Brand loyal", "Research-oriented", "Willing to pay premium for ethical products"],
    avatar: "🌱",
  },
  {
    id: 4,
    name: "Budget-Wise Brian",
    description: "30-40 year old price-sensitive consumer",
    characteristics: ["Deal seeker", "Comparison shopper", "Values affordability", "Brand agnostic"],
    avatar: "💰",
  }
];

const PersonaList = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {personas.map((persona) => (
        <Card key={persona.id} className="overflow-hidden border-2 hover:border-adsilo-primary transition-colors">
          <CardContent className="p-0">
            <div className="bg-adsilo-muted px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-lg">
                  {persona.avatar}
                </div>
                <h3 className="font-semibold">{persona.name}</h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Duplicate</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="p-4">
              <p className="text-sm text-adsilo-text-secondary mb-4">{persona.description}</p>
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase text-adsilo-text-muted tracking-wider">Characteristics</h4>
                <div className="flex flex-wrap gap-2">
                  {persona.characteristics.map((char, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-adsilo-muted px-2 py-1 rounded-full text-adsilo-text-secondary"
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t p-4">
              <Button variant="outline" size="sm" className="w-full">
                <Edit className="mr-2 h-4 w-4" />
                Edit Persona
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PersonaList;
