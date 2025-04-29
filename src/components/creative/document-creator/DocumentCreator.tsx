
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentDetails, DocumentType } from "@/components/creative/ai-content-creator/types";
import DocumentForm from './DocumentForm';
import DocumentPreview from './DocumentPreview';
import DocumentAIAssistant from './DocumentAIAssistant';
import DocumentList from './DocumentList';
import { v4 as uuidv4 } from 'uuid';

export const DocumentCreator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"create" | "preview" | "ai" | "list">("create");
  const [documentType, setDocumentType] = useState<DocumentType>('quotation');
  const [documents, setDocuments] = useState<DocumentDetails[]>([]);
  const [currentDocument, setCurrentDocument] = useState<DocumentDetails>({
    id: uuidv4(),
    type: 'quotation',
    title: 'New Quotation',
    date: new Date().toISOString().split('T')[0],
    clientInfo: {
      name: '',
      email: '',
    },
    items: [],
    subtotal: 0,
    tax: 0,
    discount: 0,
    total: 0,
    notes: '',
    terms: '',
    status: 'draft'
  });

  const handleSaveDocument = (document: DocumentDetails) => {
    // Update or add the document
    const exists = documents.find(doc => doc.id === document.id);
    
    if (exists) {
      setDocuments(documents.map(doc => doc.id === document.id ? document : doc));
    } else {
      setDocuments([...documents, document]);
    }
    
    setCurrentDocument(document);
    setActiveTab('preview');
  };

  const handleCreateNew = (type: DocumentType) => {
    setDocumentType(type);
    setCurrentDocument({
      id: uuidv4(),
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      date: new Date().toISOString().split('T')[0],
      clientInfo: {
        name: '',
        email: '',
      },
      items: [],
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      notes: '',
      terms: '',
      status: 'draft'
    });
    setActiveTab('create');
  };

  const handleEditDocument = (document: DocumentDetails) => {
    setCurrentDocument(document);
    setDocumentType(document.type);
    setActiveTab('create');
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    if (currentDocument.id === id) {
      handleCreateNew('quotation');
    }
  };

  const handleGenerateAI = (generatedDocument: DocumentDetails) => {
    setCurrentDocument(generatedDocument);
    setActiveTab('create');
  };

  const handleDuplicateDocument = (doc: DocumentDetails) => {
    const duplicatedDoc: DocumentDetails = {
      ...doc,
      id: uuidv4(),
      title: `${doc.title} (Copy)`,
      status: 'draft'
    };
    setDocuments([...documents, duplicatedDoc]);
    setCurrentDocument(duplicatedDoc);
    setActiveTab('preview');
  };

  return (
    <div className="w-full h-full flex flex-col border rounded-lg bg-white shadow-sm">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-adpilot-primary">Document Creator</h2>
        <div className="space-x-2 flex">
          <button 
            onClick={() => handleCreateNew('quotation')}
            className="bg-adpilot-primary hover:bg-adpilot-primary/90 text-white px-3 py-1 rounded-md"
          >
            New Quotation
          </button>
          <button 
            onClick={() => handleCreateNew('proposal')}
            className="bg-adpilot-secondary hover:bg-adpilot-secondary/90 text-white px-3 py-1 rounded-md"
          >
            New Proposal
          </button>
          <button 
            onClick={() => handleCreateNew('invoice')}
            className="bg-adpilot-accent hover:bg-adpilot-accent/90 text-white px-3 py-1 rounded-md"
          >
            New Invoice
          </button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full h-full flex flex-col flex-1">
        <TabsList className="w-full justify-start px-4 bg-gray-50 border-b">
          <TabsTrigger value="create">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
          <TabsTrigger value="list">Documents</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-y-auto">
          <TabsContent value="create" className="mt-0 h-full">
            <DocumentForm 
              document={currentDocument}
              onSave={handleSaveDocument}
              documentType={documentType}
            />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0 h-full">
            <DocumentPreview 
              document={currentDocument} 
              onEdit={() => setActiveTab('create')}
              onDuplicate={() => handleDuplicateDocument(currentDocument)}
            />
          </TabsContent>
          
          <TabsContent value="ai" className="mt-0 h-full">
            <DocumentAIAssistant
              onGenerate={handleGenerateAI}
              documentType={documentType}
            />
          </TabsContent>
          
          <TabsContent value="list" className="mt-0 h-full">
            <DocumentList 
              documents={documents}
              onEdit={handleEditDocument}
              onDelete={handleDeleteDocument}
              onDuplicate={handleDuplicateDocument}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
