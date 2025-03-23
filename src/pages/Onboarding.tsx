import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthLayout } from "@/components/layouts/AuthLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for indie developers and startups",
    price: "$599",
    priceDescription: "per month",
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
    description: "For growing companies and small teams",
    price: "$1,200",
    priceDescription: "per month",
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
    description: "For established companies with higher volume needs",
    price: "$2,500",
    priceDescription: "per month",
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
    description: "For large organizations with complex needs",
    price: "$10,000",
    priceDescription: "per month",
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

const Onboarding = () => {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleContinue = async () => {
    setIsLoading(true);
    
    // Simulate processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (step === 1) {
        setStep(2);
      } else {
        // In a real app, handle subscription creation here
        toast({
          title: "Your trial is ready!",
          description: `You've selected the ${plans.find(p => p.id === selectedPlan)?.name} plan with ${selectedAddOns.length} add-ons. Your free trial has started.`,
        });
        
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {step === 1 ? "Choose your plan" : "Complete your setup"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {step === 1 
              ? "Start with a 14-day free trial. No credit card required." 
              : "Just a few more steps to get you started."}
          </p>
        </div>
        
        {step === 1 ? (
          <div className="space-y-4">
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
              {plans.map((plan) => (
                <div key={plan.id} className="relative">
                  {plan.popular && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full z-10">
                      Popular
                    </div>
                  )}
                  <Label
                    htmlFor={plan.id}
                    className={`flex flex-col h-full p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                      selectedPlan === plan.id
                        ? "ring-2 ring-primary ring-offset-2 border-primary"
                        : "border-border"
                    }`}
                  >
                    <RadioGroupItem
                      value={plan.id}
                      id={plan.id}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <div className={selectedPlan === plan.id ? "text-primary" : "text-muted-foreground"}>
                        <Check className={`h-5 w-5 ${selectedPlan === plan.id ? "opacity-100" : "opacity-0"}`} />
                      </div>
                    </div>
                    <div className="flex gap-1 items-baseline mb-4">
                      <span className="text-xl font-semibold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">
                        {plan.priceDescription}
                      </span>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-sm font-medium">Records:</span>
                      <span className="text-sm">{plan.records} per month</span>
                    </div>
                    <div className="font-medium text-sm mb-2">Included Endpoints:</div>
                    <ul className="text-sm space-y-2 mt-auto">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-primary/70" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button
              onClick={handleContinue}
              className="w-full mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Add premium features</CardTitle>
                <CardDescription>
                  Enhance your {plans.find(p => p.id === selectedPlan)?.name} plan with add-ons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {addOns.map(addon => {
                  const addonPrice = addon.prices[selectedPlan as keyof typeof addon.prices];
                  const isIncluded = addonPrice === "Included";
                  
                  return (
                    <div key={addon.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{addon.name}</p>
                        <p className="text-sm text-muted-foreground">{addon.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isIncluded ? (
                          <span className="text-sm text-primary font-medium">Included</span>
                        ) : (
                          <>
                            <span className="text-sm font-medium">{addonPrice}</span>
                            <Switch 
                              checked={selectedAddOns.includes(addon.id)}
                              onCheckedChange={() => toggleAddOn(addon.id)}
                              disabled={isIncluded}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
              <CardHeader className="pb-3 border-t pt-6">
                <CardTitle>Plan Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Plan</span>
                  <span>{plans.find(p => p.id === selectedPlan)?.name}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Base Price</span>
                  <div className="flex gap-1 items-baseline">
                    <span>{plans.find(p => p.id === selectedPlan)?.price}</span>
                    <span className="text-xs text-muted-foreground">
                      {plans.find(p => p.id === selectedPlan)?.priceDescription}
                    </span>
                  </div>
                </div>
                
                {selectedAddOns.length > 0 && (
                  <>
                    <div className="h-px bg-border my-2"></div>
                    <div className="font-medium">Selected Add-ons:</div>
                    {selectedAddOns.map(addonId => {
                      const addon = addOns.find(a => a.id === addonId);
                      if (!addon) return null;
                      return (
                        <div key={addonId} className="flex justify-between items-baseline pl-4">
                          <span className="text-sm">{addon.name}</span>
                          <span className="text-sm">{addon.prices[selectedPlan as keyof typeof addon.prices]}</span>
                        </div>
                      );
                    })}
                  </>
                )}
                
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-baseline text-primary font-medium">
                  <span>First payment due</span>
                  <span>In 14 days</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleContinue}
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Setting up your account..."
                  ) : (
                    <>
                      Start your free trial <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </div>
    </AuthLayout>
  );
};

export default Onboarding;
