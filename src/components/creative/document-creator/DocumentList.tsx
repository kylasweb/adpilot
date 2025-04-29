
import React from 'react';
import { DocumentDetails } from "@/components/creative/ai-content-creator/types";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Copy } from "lucide-react";

interface DocumentListProps {
  documents: DocumentDetails[];
  onEdit: (document: DocumentDetails) => void;
  onDelete: (id: string) => void;
  onDuplicate: (document: DocumentDetails) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <span className="inline-block px-2 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded-full">Draft</span>;
      case 'sent':
        return <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">Sent</span>;
      case 'accepted':
        return <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">Accepted</span>;
      case 'rejected':
        return <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Rejected</span>;
      case 'paid':
        return <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">Paid</span>;
      default:
        return <span className="inline-block px-2 py-1 bg-gray-200 text-gray-800 text-xs font-medium rounded-full">{status}</span>;
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium mb-6">Documents</h3>
      
      {documents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500 mb-2">No documents created yet</p>
          <p className="text-sm text-gray-400">Create a new quotation, proposal, or invoice to get started</p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.title}</TableCell>
                  <TableCell className="capitalize">{doc.type}</TableCell>
                  <TableCell>{doc.clientInfo.name}</TableCell>
                  <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                  <TableCell>${doc.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(doc)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDuplicate(doc)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(doc.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
