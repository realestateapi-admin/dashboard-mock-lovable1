
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Download, AlertCircle, CreditCardIcon, CheckCircle, Wallet } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTrialAlert } from "@/contexts/TrialAlertContext";

// Mock invoice data
const invoices = [
  {
    id: "INV-001",
    date: "Nov 1, 2023",
    amount: "$99.00",
    status: "Paid",
    period: "Nov 1 - Nov 30, 2023"
  },
  {
    id: "INV-002",
    date: "Dec 1, 2023",
    amount: "$99.00",
    status: "Paid",
    period: "Dec 1 - Dec 31, 2023"
  },
  {
    id: "INV-003",
    date: "Jan 1, 2024",
    amount: "$99.00",
    status: "Paid",
    period: "Jan 1 - Jan 31, 2024"
  },
  {
    id: "INV-004",
    date: "Feb 1, 2024",
    amount: "$99.00",
    status: "Pending",
    period: "Feb 1 - Feb 29, 2024"
  }
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$49",
    description: "Perfect for indie developers and startups",
    features: [
      "100,000 API calls per month",
      "Property data for 10 major cities",
      "Standard support",
      "Basic analytics dashboard",
    ],
  },
  {
    id: "pro",
    name: "Professional",
    price: "$99",
    description: "For growing companies and small teams",
    features: [
      "500,000 API calls per month",
      "Property data for 50 major cities",
      "Priority support",
      "Advanced analytics dashboard",
      "Custom webhooks",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Contact us",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited API calls",
      "Property data for all available locations",
      "24/7 dedicated support",
      "Enterprise-grade analytics",
      "Custom data integration",
      "Service level agreement",
    ],
  },
];

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [overageHandling, setOverageHandling] = useState("allow");
  const { toast } = useToast();
  const { isTrialActive, trialDaysLeft, requestTrialExtension } = useTrialAlert();

  const handleSaveBillingPreferences = () => {
    toast({
      title: "Billing preferences updated",
      description: "Your billing preferences have been saved successfully.",
    });
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plan selection updated",
      description: `You've selected the ${plans.find(p => p.id === planId)?.name} plan.`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice download started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Billing & Subscription</h1>
      </div>
      
      {isTrialActive && (
        <Alert className="bg-primary-teal/10 border-primary-teal">
          <AlertCircle className="h-4 w-4 text-primary-teal" />
          <AlertTitle className="text-primary-teal">Trial Mode Active</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span>You have {trialDaysLeft} days left in your trial. Select a plan to continue after your trial ends.</span>
            <Button size="sm" variant="outline" onClick={requestTrialExtension}>
              Request Extension
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" /> Subscription
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCardIcon className="h-4 w-4" /> Payment Methods
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Invoices
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>
                Manage your current plan and subscription settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan) => (
                  <div key={plan.id} className="relative">
                    {plan.popular && (
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        Popular
                      </div>
                    )}
                    <div
                      className={`p-4 border rounded-lg transition-all hover:border-primary cursor-pointer ${
                        selectedPlan === plan.id
                          ? "ring-2 ring-primary ring-offset-2 border-primary"
                          : "border-border"
                      }`}
                      onClick={() => handlePlanChange(plan.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {plan.description}
                          </p>
                        </div>
                        <div className={selectedPlan === plan.id ? "text-primary" : "text-muted-foreground"}>
                          <CheckCircle className={`h-5 w-5 ${selectedPlan === plan.id ? "opacity-100" : "opacity-0"}`} />
                        </div>
                      </div>
                      <div className="flex gap-1 items-baseline mb-4">
                        <span className="text-xl font-semibold">{plan.price}</span>
                        {plan.price !== "Contact us" && (
                          <span className="text-sm text-muted-foreground">
                            per month
                          </span>
                        )}
                      </div>
                      <ul className="text-sm space-y-2 mt-auto">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-primary/70" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Overage Handling</h3>
                <p className="text-sm text-muted-foreground">
                  Choose how you want to handle API calls that exceed your plan limits
                </p>
                <RadioGroup value={overageHandling} onValueChange={setOverageHandling} className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="allow" id="allow-overages" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="allow-overages" className="font-medium">Allow Overages (Pay as you go)</Label>
                      <p className="text-sm text-muted-foreground">
                        Continue API access after reaching your plan limits with pay-as-you-go pricing for additional calls.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="throttle" id="throttle-overages" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="throttle-overages" className="font-medium">Throttle API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Reduce API rate limits when you reach your plan threshold to avoid additional charges.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="stop" id="stop-overages" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="stop-overages" className="font-medium">Stop API Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Temporarily disable API access when you reach your plan limits until the next billing cycle.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSaveBillingPreferences}>
                Save Billing Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CreditCardIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
              
              <Button variant="outline" className="w-full">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>
                View and download your past invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                          onClick={() => handleDownloadInvoice(invoice.id)}
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
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Billing;
