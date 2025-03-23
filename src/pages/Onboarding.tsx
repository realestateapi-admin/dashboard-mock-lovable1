
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
import { useToast } from "@/components/ui/use-toast";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for indie developers and startups",
    price: "$49",
    priceDescription: "per month",
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
    description: "For growing companies and small teams",
    price: "$99",
    priceDescription: "per month",
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
    description: "For large organizations with complex needs",
    price: "Contact us",
    priceDescription: "for custom pricing",
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

const Onboarding = () => {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
          description: `You've selected the ${selectedPlan} plan. Your free trial has started.`,
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
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="gap-4 pt-2">
              {plans.map((plan) => (
                <div key={plan.id} className="relative">
                  {plan.popular && (
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      Popular
                    </div>
                  )}
                  <Label
                    htmlFor={plan.id}
                    className={`flex flex-col p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
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
                <CardTitle>Confirm your selection</CardTitle>
                <CardDescription>
                  You've selected the {plans.find(p => p.id === selectedPlan)?.name} plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Plan</span>
                  <span>{plans.find(p => p.id === selectedPlan)?.name}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Price</span>
                  <div className="flex gap-1 items-baseline">
                    <span>{plans.find(p => p.id === selectedPlan)?.price}</span>
                    <span className="text-xs text-muted-foreground">
                      {plans.find(p => p.id === selectedPlan)?.priceDescription}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium">Trial Period</span>
                  <span>14 days</span>
                </div>
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
