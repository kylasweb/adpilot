import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight, Loader2, Receipt } from "lucide-react";
import { Invoice } from './types';

interface InvoiceTableProps {
    invoices: Invoice[];
    loading: boolean;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onDownload: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
    invoices,
    loading,
    page,
    totalPages,
    onPageChange,
    onDownload
}) => {
    const getStatusBadge = (status: string) => {
        const variants: Record<string, string> = {
            PAID: 'bg-green-100 text-green-800',
            PENDING: 'bg-yellow-100 text-yellow-800',
            FAILED: 'bg-red-100 text-red-800',
            REFUNDED: 'bg-gray-100 text-gray-800'
        };
        return <Badge className={variants[status] || variants.PENDING}>{status}</Badge>;
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD'
        }).format(amount);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-adsilo-primary" />
            </div>
        );
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Paid Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-12 text-adsilo-text-muted">
                                <Receipt className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <div>No invoices found</div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                                <TableCell>
                                    <div className="font-medium">{invoice.invoiceNumber}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {new Date(invoice.createdAt).toLocaleDateString()}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-semibold">
                                        {formatCurrency(invoice.amount, invoice.currency)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(invoice.status)}
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-adsilo-text-muted">
                                        {invoice.paidAt
                                            ? new Date(invoice.paidAt).toLocaleDateString()
                                            : '-'
                                        }
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onDownload(invoice)}
                                        disabled={!invoice.invoiceUrl}
                                    >
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-adsilo-text-muted">
                        Page {page} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={page === 1}
                            onClick={() => onPageChange(Math.max(1, page - 1))}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={page === totalPages}
                            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default InvoiceTable;
