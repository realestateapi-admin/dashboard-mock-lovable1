
import React from "react";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type CreditCardFormValues } from "../hooks/useCreditCardForm";
import { UseFormReturn } from "react-hook-form";

interface CreditCardFormFieldsProps {
  form: UseFormReturn<CreditCardFormValues>;
  handleInputChange: (field: keyof CreditCardFormValues, value: string) => void;
  cardNumberError?: string;
  displayCvc?: string;
  cvcMasked?: boolean;
  displayCardNumber?: string;
  cardNumberMasked?: boolean;
}

const CreditCardFormFields: React.FC<CreditCardFormFieldsProps> = ({ 
  form, 
  handleInputChange, 
  cardNumberError,
  displayCvc,
  cvcMasked,
  displayCardNumber,
  cardNumberMasked
}) => {
  return (
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
                    value={displayCardNumber || field.value}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    className={cardNumberError ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  <Lock className="absolute top-1/2 transform -translate-y-1/2 right-3 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              {cardNumberError && (
                <p className="text-sm text-red-600">{cardNumberError}</p>
              )}
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
                    value={displayCvc || field.value}
                    onChange={(e) => handleInputChange("cvc", e.target.value)}
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
  );
};

export default CreditCardFormFields;
