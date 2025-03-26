
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ScheduleCallTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Support Call</CardTitle>
          <CardDescription>
            Book a one-on-one call with our customer success team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-start mb-6 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Select a convenient time for your call</span>
          </div>
          
          <div className="calendly-embed rounded-lg border overflow-hidden" style={{ height: "630px" }}>
            <iframe
              src="https://calendly.com/lukas_the_devtrepreneur/customer-success-call"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a call with our support team"
            ></iframe>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 border-t p-4 bg-muted/50">
          <h4 className="text-sm font-medium">Why schedule a call?</h4>
          <p className="text-sm text-muted-foreground">
            Our customer success team can help you with complex integration questions, custom solutions, 
            or any other challenges you're facing with our API.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ScheduleCallTab;
