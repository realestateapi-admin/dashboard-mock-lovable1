
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { UsageHistoryEntry } from "@/types/usage";

interface UsageHistoryTableProps {
  data: UsageHistoryEntry[];
}

export const UsageHistoryTable = ({ data }: UsageHistoryTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  // Filter data based on search query
  const filteredData = data.filter(entry =>
    entry.request.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Create page numbers array for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Get badge variant based on status
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

  // Get icon for endpoint type
  const getEndpointIcon = (endpoint: string) => {
    switch (endpoint.toLowerCase()) {
      case 'property search':
        return <img src="/icons/ps.svg" alt="Property Search" className="h-5 w-5 mr-2" />;
      case 'property detail':
        return <img src="/icons/ps2.svg" alt="Property Detail" className="h-5 w-5 mr-2" />;
      case 'property comps':
        return <img src="/icons/ps3.svg" alt="Property Comps" className="h-5 w-5 mr-2" />;
      case 'autocomplete':
        return <img src="/icons/address-auto.svg" alt="Autocomplete" className="h-5 w-5 mr-2" />;
      case 'mapping':
        return <img src="/icons/map-pin.svg" alt="Mapping" className="h-5 w-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search requests, endpoints, or status..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Endpoint</TableHead>
              <TableHead>Request</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Response Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {format(new Date(entry.timestamp), 'MMM d, yyyy HH:mm:ss')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {getEndpointIcon(entry.endpoint)}
                      <span>{entry.endpoint}</span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={entry.request}>
                    {entry.request}
                  </TableCell>
                  <TableCell>{entry.credits}</TableCell>
                  <TableCell>{getStatusBadge(entry.status)}</TableCell>
                  <TableCell className="text-right">
                    {entry.responseTime}ms
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {searchQuery ? "No matching records found" : "No records found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            
            {pageNumbers.map(number => (
              <PaginationItem key={number}>
                <PaginationLink
                  isActive={currentPage === number}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
