
import { Skeleton } from "@/components/ui/skeleton";

export const PlanOptionSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Billing Cycle Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      
      {/* Plans Skeleton */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-36 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
};

export const AddOnsSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-36 mb-6" />
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-24 w-full rounded-lg" />
      ))}
    </div>
  );
};

export const OverageHandlingSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-36 mb-2" />
      <Skeleton className="h-4 w-64 mb-6" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export const PaymentMethodSkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-36 mb-2" />
      <Skeleton className="h-4 w-64 mb-6" />
      
      {/* Tabs skeleton */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      {/* Card form skeleton */}
      <div className="space-y-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};

export const SummarySkeleton = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-20 w-full" />
      <div className="py-3 space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="pt-3 space-y-2">
        <Skeleton className="h-4 w-36" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <Skeleton className="h-10 w-full mt-4" />
    </div>
  );
};
