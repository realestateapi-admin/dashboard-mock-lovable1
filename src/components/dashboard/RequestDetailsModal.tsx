import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Clock, CreditCard, Hash } from "lucide-react";
import { UsageHistoryEntry } from "@/types/usage";
import { format } from "date-fns";

interface RequestDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: UsageHistoryEntry | null;
}

export const RequestDetailsModal = ({
  isOpen,
  onClose,
  entry,
}: RequestDetailsModalProps) => {
  if (!entry) return null;

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge>;
      case 'error':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200">Warning</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getResponseCodeColor = (status: string) => {
    const code = status.toLowerCase();
    if (code === 'success' || code.startsWith('2')) return 'text-green-600';
    if (code === 'error' || code.startsWith('4') || code.startsWith('5')) return 'text-red-600';
    if (code === 'warning' || code.startsWith('3')) return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold">
            {entry.endpoint}
          </DialogTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <DialogClose asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Request Metadata */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Timestamp</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm:ss')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Response Time</p>
                <p className="text-sm text-muted-foreground">{entry.responseTime}ms</p>
              </div>
            </div>
          </div>

          {/* Full Request */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span>Full Request</span>
            </h3>
            <div className="bg-muted/50 rounded-lg p-4 border">
              <pre className="text-sm whitespace-pre-wrap break-words overflow-x-auto">
                {entry.request}
              </pre>
            </div>
          </div>

          {/* Response Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-medium">Status</div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(entry.status)}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">Credits Used</div>
              </div>
              <div className="text-2xl font-bold text-primary">
                {entry.credits}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm font-medium">Response Code</div>
              </div>
              <div className={`text-2xl font-bold ${getResponseCodeColor(entry.status)}`}>
                {entry.status === 'success' ? '200' : 
                 entry.status === 'error' ? '400' : 
                 entry.status === 'warning' ? '429' : 'N/A'}
              </div>
            </div>
          </div>

          {/* Additional Counts (if applicable) */}
          {entry.credits > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Usage Metrics</h3>
              <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Records Processed:</span>
                  <span className="font-medium">1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Credits Consumed:</span>
                  <span className="font-medium">{entry.credits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing Time:</span>
                  <span className="font-medium">{entry.responseTime}ms</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};