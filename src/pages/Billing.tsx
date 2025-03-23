
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Download, AlertCircle, CreditCardIcon, CheckCircle, Wallet, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTrialAlert } from "@/contexts/TrialAlertContext";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    price: "$599",
    description: "Perfect for indie developers and startups",
    records: "30,000",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Comps"
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "$1,200",
    description: "For growing companies and small teams",
    records: "150,000",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Comps",
      "CSV Generator",
      "Parcel Boundary",
      "Address Verification",
      "Mapping pins (unlimited)"
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$2,500",
    description: "For established companies with higher volume needs",
    records: "250,000",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Comps",
      "CSV Generator",
      "Parcel Boundary",
      "Address Verification",
      "Address Verification Bulk",
      "Mapping pins (unlimited)",
      "Saved Search"
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$10,000",
    description: "For large organizations with complex needs",
    records: "5,000,000",
    features: [
      "Auto-Complete (unlimited)",
      "Property Search",
      "Property Detail",
      "Property Detail Bulk",
      "Comps",
      "CSV Generator",
      "Parcel Boundary",
      "Address Verification",
      "Address Verification Bulk",
      "Mapping pins (unlimited)",
      "Saved Search"
    ],
  },
];

const addOns = [
  {
    id: "premium-avm",
    name: "Premium AVM",
    description: "Advanced automated valuation model for more accurate property estimates",
    prices: {
      starter: "$250",
      growth: "$500",
      pro: "$1,000",
      enterprise: "$2,500",
    }
  },
  {
    id: "lien-search",
    name: "Involuntary Lien Search",
    description: "Search for liens against properties",
    prices: {
      starter: "$1 each",
      growth: "$0.75 each",
      pro: "$0.50 each",
      enterprise: "$0.40 each",
    }
  },
  {
    id: "tech-support",
    name: "Tech Support",
    description: "Premium technical support package",
    prices: {
      starter: "$250/month",
      growth: "Included",
      pro: "Included",
      enterprise: "Included",
    }
  }
];

const Billing = () => {
  const [selectedPlan, setSelectedPlan] = useState("growth");
  const [overageHandling, setOverageHandling] = useState("allow");
  const [activeAddOns, setActiveAddOns] = useState<string[]>(["premium-avm"]);
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

  const toggleAddOn = (addOnId: string) => {
    setActiveAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice download started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  // Calculate estimated monthly cost
  const calculateMonthlyCost = () => {
    const basePlan = plans.find(p => p.id === selectedPlan);
    if (!basePlan) return { basePrice: "$0", totalAddOns: "$0", total: "$0" };
    
    // Extract numeric price from base plan (removing $ and /mo)
    const basePrice = parseInt(basePlan.price.replace(/\$|,/g, ""));
    
    // Calculate add-on costs
    let addOnTotal = 0;
    activeAddOns.forEach(addonId => {
      const addon = addOns.find(a => a.id === addonId);
      if (!addon) return;
      
      const priceStr = addon.prices[selectedPlan as keyof typeof addon.prices];
      if (priceStr === "Included") return;
      
      // Only add monthly costs (ignoring "each" pricing for usage-based services)
      if (priceStr.includes("/month")) {
        const price = parseInt(priceStr.replace(/\$|,|\/month/g, ""));
        addOnTotal += price;
      }
    });
    
    return {
      basePrice: `$${basePrice.toLocaleString()}`,
      totalAddOns: `$${addOnTotal.toLocaleString()}`,
      total: `$${(basePrice + addOnTotal).toLocaleString()}`
    };
  };

  const costs = calculateMonthlyCost();

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
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>
                    Manage your current plan and subscription settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
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
                              <p className="text-xs text-muted-foreground">
                                {plan.description}
                              </p>
                            </div>
                            <div className={selectedPlan === plan.id ? "text-primary" : "text-muted-foreground"}>
                              <CheckCircle className={`h-5 w-5 ${selectedPlan === plan.id ? "opacity-100" : "opacity-0"}`} />
                            </div>
                          </div>
                          <div className="flex gap-1 items-baseline mb-4">
                            <span className="text-xl font-semibold">{plan.price}</span>
                            <span className="text-xs text-muted-foreground">
                              /month
                            </span>
                          </div>
                          <div className="mb-4 flex items-center gap-2">
                            <span className="text-xs font-medium">Records:</span>
                            <span className="text-xs">{plan.records}/mo</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Add-Ons</h3>
                    <p className="text-sm text-muted-foreground">
                      Enhance your subscription with premium features
                    </p>
                    
                    <div className="space-y-4">
                      {addOns.map(addon => {
                        const addonPrice = addon.prices[selectedPlan as keyof typeof addon.prices];
                        const isIncluded = addonPrice === "Included";
                        
                        return (
                          <div key={addon.id} className="flex items-center justify-between border-b pb-3">
                            <div>
                              <p className="font-medium">{addon.name}</p>
                              <p className="text-sm text-muted-foreground">{addon.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {isIncluded ? (
                                <span className="text-sm text-primary font-medium">Included with plan</span>
                              ) : (
                                <>
                                  <span className="text-sm font-medium">{addonPrice}</span>
                                  <Switch 
                                    checked={activeAddOns.includes(addon.id)}
                                    onCheckedChange={() => toggleAddOn(addon.id)}
                                    disabled={isIncluded}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-medium">Overage Handling</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose how to handle API calls that exceed your plan limits
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
            </div>
            
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Summary</CardTitle>
                  <CardDescription>
                    Your current plan and billing details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium">Base Plan</span>
                    <span className="font-medium">{plans.find(p => p.id === selectedPlan)?.name}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm">Base Price</span>
                    <span>{costs.basePrice}/month</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm">Records</span>
                    <span>{plans.find(p => p.id === selectedPlan)?.records}/month</span>
                  </div>
                  
                  {activeAddOns.length > 0 && (
                    <>
                      <div className="h-px bg-border my-2"></div>
                      <div className="font-medium">Active Add-ons:</div>
                      {activeAddOns.map(addonId => {
                        const addon = addOns.find(a => a.id === addonId);
                        if (!addon) return null;
                        const price = addon.prices[selectedPlan as keyof typeof addon.prices];
                        return (
                          <div key={addonId} className="flex justify-between items-baseline pl-4">
                            <span className="text-sm">{addon.name}</span>
                            <span className="text-sm">{price === "Included" ? "Included" : price}</span>
                          </div>
                        );
                      })}
                      {costs.totalAddOns !== "$0" && (
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-medium">Add-ons Subtotal</span>
                          <span>{costs.totalAddOns}/month</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-baseline text-primary font-medium">
                    <span>Estimated Monthly Total</span>
                    <span>{costs.total}/month</span>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Change Billing Cycle
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
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
