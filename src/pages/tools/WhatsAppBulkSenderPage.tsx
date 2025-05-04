
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import WhatsAppSender from "@/components/whatsapp/WhatsAppSender";

const WhatsAppBulkSenderPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">WhatsApp Bulk Sender</h1>
          <p className="text-adpilot-text-secondary mt-1">
            Send personalized messages to multiple contacts via WhatsApp
          </p>
        </div>
        <WhatsAppSender />
      </div>
    </AppLayout>
  );
};

export default WhatsAppBulkSenderPage;
