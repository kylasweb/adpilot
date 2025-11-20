
import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DocumentDetails,
  DocumentType,
  ServiceItem,
  ClientInfo,
  ServiceCategory,
  ContentLanguage,
  DocumentCurrency
} from "@/components/creative/ai-content-creator/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2, Receipt, Languages, CurrencyIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from 'uuid';

interface DocumentFormProps {
  document: DocumentDetails;
  documentType: DocumentType;
  onSave: (document: DocumentDetails) => void;
}

const serviceCategoryOptions: { value: ServiceCategory; label: string }[] = [
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'web-design', label: 'Web Design' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'seo', label: 'SEO' },
  { value: 'content-creation', label: 'Content Creation' },
  { value: 'branding', label: 'Branding' },
  { value: 'other', label: 'Other' }
];

const languageOptions: { value: ContentLanguage; label: string }[] = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'italian', label: 'Italian' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'russian', label: 'Russian' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'hindi', label: 'Hindi' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'malayalam', label: 'Malayalam' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'telugu', label: 'Telugu' },
];

const currencyOptions: { value: DocumentCurrency; label: string; symbol: string }[] = [
  { value: 'USD', label: 'US Dollar', symbol: '$' },
  { value: 'EUR', label: 'Euro', symbol: '€' },
  { value: 'GBP', label: 'British Pound', symbol: '£' },
  { value: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { value: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
  { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
  { value: 'SGD', label: 'Singapore Dollar', symbol: 'S$' },
  { value: 'JPY', label: 'Japanese Yen', symbol: '¥' },
  { value: 'CNY', label: 'Chinese Yuan', symbol: '¥' },
  { value: 'AED', label: 'UAE Dirham', symbol: 'د.إ' },
];

const DocumentForm: React.FC<DocumentFormProps> = ({
  document,
  documentType,
  onSave
}) => {
  const [formData, setFormData] = useState<DocumentDetails>({ ...document });
  const [activeTab, setActiveTab] = useState<"details" | "items" | "terms" | "settings">("details");

  useEffect(() => {
    setFormData({ ...document });
  }, [document]);

  const calculateTotals = useCallback(() => {
    const subtotal = formData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxAmount = (subtotal * formData.tax) / 100;
    const discountAmount = (subtotal * formData.discount) / 100;
    const total = subtotal + taxAmount - discountAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      total
    }));
  }, [formData.items, formData.tax, formData.discount]);

  useEffect(() => {
    // Calculate totals whenever items change
    calculateTotals();
  }, [calculateTotals]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else if (name === 'tax' || name === 'discount') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleItemChange = (id: string, field: keyof ServiceItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: field === 'price' || field === 'quantity' ? parseFloat(value) || 0 : value } : item
      )
    }));
  };

  const addNewItem = () => {
    const newItem: ServiceItem = {
      id: uuidv4(),
      name: '',
      description: '',
      quantity: 1,
      price: 0,
      category: 'digital-marketing'
    };

    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleCurrencyChange = (currency: DocumentCurrency) => {
    const selectedCurrency = currencyOptions.find(c => c.value === currency);

    setFormData(prev => ({
      ...prev,
      currency,
      currencySymbol: selectedCurrency?.symbol || '$'
    }));
  };

  const handleSave = () => {
    onSave({
      ...formData,
      type: documentType
    });
  };

  const getCurrencySymbol = () => {
    return formData.currencySymbol || '$';
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium capitalize">
          {formData.title || `New ${documentType}`}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-4 text-sm">
            {formData.language && (
              <div className="flex items-center text-muted-foreground mr-2">
                <Languages className="h-4 w-4 mr-1" />
                <span className="capitalize">{formData.language}</span>
              </div>
            )}
            {formData.currency && (
              <div className="flex items-center text-muted-foreground">
                <CurrencyIcon className="h-4 w-4 mr-1" />
                <span>{formData.currency}</span>
              </div>
            )}
          </div>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Save {documentType}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="details">Document Details</TabsTrigger>
          <TabsTrigger value="items">Service Items</TabsTrigger>
          <TabsTrigger value="terms">Terms & Notes</TabsTrigger>
          <TabsTrigger value="settings">Language & Currency</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter document title"
                    />
                  </div>

                  <div>
                    <Label htmlFor="date">Issue Date</Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                  </div>

                  {documentType === 'invoice' && (
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={formData.dueDate || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        {documentType === 'invoice' && <SelectItem value="paid">Paid</SelectItem>}
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Client Information</h4>

                  <div>
                    <Label htmlFor="clientInfo.name">Client Name</Label>
                    <Input
                      id="clientInfo.name"
                      name="clientInfo.name"
                      value={formData.clientInfo.name}
                      onChange={handleInputChange}
                      placeholder="Client name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientInfo.email">Client Email</Label>
                    <Input
                      id="clientInfo.email"
                      name="clientInfo.email"
                      value={formData.clientInfo.email}
                      onChange={handleInputChange}
                      placeholder="client@example.com"
                      type="email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientInfo.company">Client Company</Label>
                    <Input
                      id="clientInfo.company"
                      name="clientInfo.company"
                      value={formData.clientInfo.company || ''}
                      onChange={handleInputChange}
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientInfo.phone">Client Phone</Label>
                    <Input
                      id="clientInfo.phone"
                      name="clientInfo.phone"
                      value={formData.clientInfo.phone || ''}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Service Items</h4>
                <Button variant="outline" onClick={addNewItem} className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Add Item
                </Button>
              </div>

              {formData.items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No items added. Click "Add Item" to start adding services.
                </div>
              ) : (
                <div className="space-y-6">
                  {formData.items.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h5 className="font-medium">Item #{index + 1}</h5>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor={`item-name-${item.id}`}>Service Name</Label>
                          <Input
                            id={`item-name-${item.id}`}
                            value={item.name}
                            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                            placeholder="Service name"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`item-category-${item.id}`}>Category</Label>
                          <Select
                            value={item.category}
                            onValueChange={(value) => handleItemChange(item.id, 'category', value)}
                          >
                            <SelectTrigger id={`item-category-${item.id}`}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceCategoryOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label htmlFor={`item-description-${item.id}`}>Description</Label>
                        <Textarea
                          id={`item-description-${item.id}`}
                          value={item.description}
                          onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                          placeholder="Service description"
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`item-quantity-${item.id}`}>Quantity</Label>
                          <Input
                            id={`item-quantity-${item.id}`}
                            type="number"
                            value={item.quantity}
                            min={1}
                            onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor={`item-price-${item.id}`}>Price</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500">{getCurrencySymbol()}</span>
                            </div>
                            <Input
                              id={`item-price-${item.id}`}
                              type="number"
                              value={item.price}
                              min={0}
                              step="0.01"
                              onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                              className="pl-7"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-right mt-2 text-sm font-medium">
                        Item Total: {getCurrencySymbol()}{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 border-t pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tax">Tax Rate (%)</Label>
                      <Input
                        id="tax"
                        name="tax"
                        type="number"
                        min={0}
                        step="0.1"
                        value={formData.tax}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        name="discount"
                        type="number"
                        min={0}
                        step="0.1"
                        value={formData.discount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span>{getCurrencySymbol()}{formData.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax ({formData.tax}%):</span>
                      <span>{getCurrencySymbol()}{((formData.subtotal * formData.tax) / 100).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Discount ({formData.discount}%):</span>
                      <span>-{getCurrencySymbol()}{((formData.subtotal * formData.discount) / 100).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between pt-2 border-t font-medium text-lg">
                      <span>Total:</span>
                      <span>{getCurrencySymbol()}{formData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes or information for the client"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="terms">Terms & Conditions</Label>
                  <Textarea
                    id="terms"
                    name="terms"
                    value={formData.terms}
                    onChange={handleInputChange}
                    placeholder="Terms and conditions for this document"
                    rows={6}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Language Settings</h4>

                  <div>
                    <Label htmlFor="document-language">Document Language</Label>
                    <Select
                      value={formData.language || 'english'}
                      onValueChange={(value) => setFormData({ ...formData, language: value as ContentLanguage })}
                    >
                      <SelectTrigger id="document-language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      This affects AI generated content and document translations.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Currency Settings</h4>

                  <div>
                    <Label htmlFor="document-currency">Currency</Label>
                    <Select
                      value={formData.currency || 'USD'}
                      onValueChange={(value) => handleCurrencyChange(value as DocumentCurrency)}
                    >
                      <SelectTrigger id="document-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.symbol} {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      This will update the currency symbol throughout the document.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-2">Display Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="show-currency-code">Show Currency Code</Label>
                    <Select
                      defaultValue="symbol"
                    >
                      <SelectTrigger id="show-currency-code">
                        <SelectValue placeholder="Select display option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="symbol">Symbol Only ({getCurrencySymbol()})</SelectItem>
                        <SelectItem value="code">Currency Code ({formData.currency})</SelectItem>
                        <SelectItem value="both">Both ({getCurrencySymbol()} {formData.currency})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="decimal-places">Decimal Places</Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="decimal-places">
                        <SelectValue placeholder="Select decimal places" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 (1234)</SelectItem>
                        <SelectItem value="2">2 (1234.56)</SelectItem>
                        <SelectItem value="3">3 (1234.567)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          Save {documentType}
        </Button>
      </div>
    </div>
  );
};

export default DocumentForm;
