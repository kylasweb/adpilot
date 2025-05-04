
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import ChatbotBuilder from "@/components/chatbot/ChatbotBuilder";

const ChatbotBuilderPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">AI Chatbot Builder</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Create intelligent conversational agents for multiple platforms
          </p>
        </div>
        <ChatbotBuilder />
      </div>
    </AppLayout>
  );
};

export default ChatbotBuilderPage;
