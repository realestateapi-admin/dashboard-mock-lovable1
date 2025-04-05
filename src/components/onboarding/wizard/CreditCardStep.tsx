
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Lock, ShieldCheck } from "lucide-react";

const formSchema = z.object({
  cardName: z.string().min(2, { message: "Name is required" }),
  cardNumber: z.string().min(16, { message: "Enter a valid card number" }).max(19),
  expiry: z.string().min(5, { message: "Enter a valid expiry date (MM/YY)" }),
  cvc: z.string().min(3, { message: "Enter a valid CVC" }).max(4),
  zipCode: z.string().min(5, { message: "Enter a valid ZIP code" }).max(10),
});

type CreditCardFormValues = z.infer<typeof formSchema>;

interface CreditCardStepProps {
  updateField: (field: string, value: any) => void;
  creditCardInfo: any;
  userName?: string; // Add userName prop to pre-fill card name
}

const CreditCardStep = ({ updateField, creditCardInfo, userName }: CreditCardStepProps) => {
  const [secureMessage] = useState(
    "Your card information is only collected for identification purposes. No charges will be made during your 14-day free trial."
  );

  const form = useForm<CreditCardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: creditCardInfo?.cardName || userName || "",
      cardNumber: creditCardInfo?.cardNumber || "",
      expiry: creditCardInfo?.expiry || "",
      cvc: creditCardInfo?.cvc || "",
      zipCode: creditCardInfo?.zipCode || "",
    },
  });

  const onSubmit = (data: CreditCardFormValues) => {
    updateField("creditCardInfo", data);
  };

  const handleInputChange = (field: keyof CreditCardFormValues, value: string) => {
    // Format card number with spaces for readability
    if (field === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
      value = value.substring(0, 19); // Limit to 16 digits plus spaces
    }

    // Format expiry date with slash
    if (field === "expiry") {
      value = value.replace(/\s/g, "").replace(/[^0-9]/g, "");
      if (value.length > 2) {
        value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
      }
      value = value.substring(0, 5); // MM/YY format (5 chars total)
    }

    // Limit CVC to 3-4 digits
    if (field === "cvc") {
      value = value.replace(/[^0-9]/g, "").substring(0, 4);
    }

    // Format ZIP code
    if (field === "zipCode") {
      value = value.replace(/[^0-9-]/g, "").substring(0, 10);
    }

    form.setValue(field, value);
    const formValues = { ...form.getValues(), [field]: value };
    updateField("creditCardInfo", formValues);
  };

  // Check if all fields are filled for real-time validation
  const isStepValid = 
    !!form.getValues("cardName") && 
    form.getValues("cardNumber").replace(/\s/g, "").length >= 16 &&
    form.getValues("expiry").length === 5 &&
    form.getValues("cvc").length >= 3 &&
    form.getValues("zipCode").length >= 5;

  // Update parent component validation state when form values change
  React.useEffect(() => {
    if (isStepValid) {
      onSubmit(form.getValues());
    }
  }, [form.getValues("cardName"), form.getValues("cardNumber"), form.getValues("expiry"), form.getValues("cvc"), form.getValues("zipCode")]);

  return (
    <div className="space-y-6">
      {/* Security message banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center gap-3">
        <ShieldCheck className="h-6 w-6 text-blue-500" />
        <p className="text-sm text-blue-700">{secureMessage}</p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name on card</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Smith" 
                    value={field.value}
                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="1234 5678 9012 3456" 
                      value={field.value}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    />
                    <Lock className="absolute top-1/2 transform -translate-y-1/2 right-3 h-4 w-4 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry date</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="MM/YY" 
                      value={field.value}
                      onChange={(e) => handleInputChange("expiry", e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="123" 
                      value={field.value}
                      onChange={(e) => handleInputChange("cvc", e.target.value)}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing ZIP Code</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="12345" 
                    value={field.value}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      
      {/* Additional trust indicators */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
          <Lock className="h-4 w-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default CreditCardStep;
