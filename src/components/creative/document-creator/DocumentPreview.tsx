
import React from 'react';
import { DocumentDetails } from "@/components/creative/ai-content-creator/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Edit, Copy, Printer, Download } from "lucide-react";

interface DocumentPreviewProps {
  document: DocumentDetails;
  onEdit: () => void;
  onDuplicate: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  document,
  onEdit,
  onDuplicate
}) => {
  const getStatusColor = () => {
    switch (document.status) {
      case 'draft': return 'bg-gray-200 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here with a PDF generation library');
    // In a real implementation, you would use a library like jspdf or react-pdf
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          <h3 className="text-xl font-medium">Document Preview</h3>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={onEdit}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            onClick={onDuplicate}
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
          <Button 
            variant="outline" 
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="p-8 max-w-4xl mx-auto bg-white shadow-sm">
        <div className="print:block" id="printable-document">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold text-adpilot-primary">{document.title}</h2>
              <p className="text-gray-500">
                {document.type.charAt(0).toUpperCase() + document.type.slice(1)} #{document.id.substring(0, 8)}
              </p>
              <p className="mt-2">Date: {new Date(document.date).toLocaleDateString()}</p>
              {document.dueDate && (
                <p>Due Date: {new Date(document.dueDate).toLocaleDateString()}</p>
              )}
              <div className={`mt-2 inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {document.status.toUpperCase()}
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-xl text-adpilot-primary">AdPilot</div>
              <p>123 Marketing Street</p>
              <p>Digital City, DC 12345</p>
              <p>contact@adpilot.com</p>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">Client Information</h3>
            <p className="font-medium">{document.clientInfo.name}</p>
            {document.clientInfo.company && <p>{document.clientInfo.company}</p>}
            <p>{document.clientInfo.email}</p>
            {document.clientInfo.phone && <p>{document.clientInfo.phone}</p>}
            {document.clientInfo.address && <p>{document.clientInfo.address}</p>}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 text-left border-b">Service</th>
                  <th className="py-2 px-4 text-left border-b">Description</th>
                  <th className="py-2 px-4 text-center border-b">Qty</th>
                  <th className="py-2 px-4 text-right border-b">Price</th>
                  <th className="py-2 px-4 text-right border-b">Total</th>
                </tr>
              </thead>
              <tbody>
                {document.items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500">
                      No items added to this document
                    </td>
                  </tr>
                ) : (
                  document.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{item.description}</td>
                      <td className="py-3 px-4 text-center">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3} className="py-2"></td>
                  <td className="py-2 px-4 text-right font-medium">Subtotal</td>
                  <td className="py-2 px-4 text-right">${document.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2"></td>
                  <td className="py-2 px-4 text-right font-medium">Tax ({document.tax}%)</td>
                  <td className="py-2 px-4 text-right">${((document.subtotal * document.tax) / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-2"></td>
                  <td className="py-2 px-4 text-right font-medium">Discount ({document.discount}%)</td>
                  <td className="py-2 px-4 text-right">-${((document.subtotal * document.discount) / 100).toFixed(2)}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-2"></td>
                  <td className="py-3 px-4 text-right font-bold">Total</td>
                  <td className="py-3 px-4 text-right font-bold text-adpilot-primary">${document.total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {(document.notes || document.terms) && (
            <div className="mb-8 space-y-6">
              {document.notes && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <p className="whitespace-pre-wrap text-gray-700">{document.notes}</p>
                </div>
              )}
              
              {document.terms && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Terms & Conditions</h3>
                  <p className="whitespace-pre-wrap text-gray-700">{document.terms}</p>
                </div>
              )}
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-12 pt-4 border-t">
            <p>Thank you for your business!</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocumentPreview;
