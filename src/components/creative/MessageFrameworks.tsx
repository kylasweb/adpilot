
import React from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Edit, Copy } from "lucide-react";

const frameworks = [
  {
    id: "fw1",
    title: "Product Launch Framework",
    description: "Framework for introducing new products to the market",
    sections: [
      {
        title: "Primary Message",
        content: "Introducing [Product Name]: The [key benefit] solution for [target audience]."
      },
      {
        title: "Supporting Points",
        content: [
          "[Feature 1] that delivers [benefit 1]",
          "[Feature 2] that delivers [benefit 2]",
          "[Feature 3] that delivers [benefit 3]"
        ]
      },
      {
        title: "Call to Action",
        content: "Get/Try/Buy [Product Name] today and experience [key benefit]."
      }
    ]
  },
  {
    id: "fw2",
    title: "Limited-Time Offer Framework",
    description: "Framework for creating urgency with limited-time promotions",
    sections: [
      {
        title: "Primary Message",
        content: "For a limited time: [Discount/Offer] on [Product/Service]!"
      },
      {
        title: "Supporting Points",
        content: [
          "Save [amount/percentage] when you buy before [date]",
          "Exclusive offer for [target audience]",
          "[Product feature] at an unbeatable price"
        ]
      },
      {
        title: "Call to Action",
        content: "Hurry! Offer ends [date]. Shop/Buy now before it's too late."
      }
    ]
  },
  {
    id: "fw3",
    title: "Problem-Solution Framework",
    description: "Framework for addressing customer pain points",
    sections: [
      {
        title: "Primary Message",
        content: "Tired of [pain point]? [Product/Service] is your solution."
      },
      {
        title: "Supporting Points",
        content: [
          "No more [specific problem] with our [specific solution]",
          "[Product/Service] helps you [benefit] without [pain point]",
          "Join [number] customers who've solved [pain point]"
        ]
      },
      {
        title: "Call to Action",
        content: "Solve your [pain point] today - Try [Product/Service]!"
      }
    ]
  }
];

const MessageFrameworks = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Message Frameworks</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Framework
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {frameworks.map((framework) => (
          <Card key={framework.id} className="overflow-hidden">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold">{framework.title}</h3>
              <p className="text-sm text-adsilo-text-secondary mt-1">{framework.description}</p>
              
              <Accordion type="single" collapsible className="mt-4">
                {framework.sections.map((section, index) => (
                  <AccordionItem key={index} value={`section-${index}`}>
                    <AccordionTrigger className="text-sm font-medium">{section.title}</AccordionTrigger>
                    <AccordionContent>
                      {Array.isArray(section.content) ? (
                        <ul className="list-disc pl-6 space-y-1 text-sm text-adsilo-text-secondary">
                          {section.content.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-adsilo-text-secondary">{section.content}</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t p-4">
              <Button variant="outline" size="sm">
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </Button>
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MessageFrameworks;
