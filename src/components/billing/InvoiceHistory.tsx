
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Info } from "lucide-react";
import { InvoiceData } from "@/types/billing";

interface InvoiceHistoryProps {
  invoices: InvoiceData[];
  onDownloadInvoice: (invoiceId: string) => void;
}

export const InvoiceHistory = ({ invoices, onDownloadInvoice }: InvoiceHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice History</CardTitle>
        <CardDescription>
          View and download your past invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
          <Info className="h-4 w-4 text-green-600" />
          <AlertDescription>
            Your invoice is being generated on or around the first of every month. Your payment method is automatically debited 5 business days later.
          </AlertDescription>
        </Alert>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Period</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === "Paid" ? "default" : "outline"}>
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.period}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDownloadInvoice(invoice.id)}
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
