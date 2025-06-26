
import React from "react";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type CreditCardFormValues } from "../hooks/useCreditCardFormRefactored";
import { UseFormReturn } from "react-hook-form";

interface CreditCardFormFieldsProps {
  form: UseFormReturn<CreditCardFormValues>;
  handleInputChange: (field: keyof CreditCardFormValues, value: string) => void;
  cardNumberError?: string;
  expiryError?: string;
  displayCvc?: string;
  cvcMasked?: boolean;
  displayCardNumber?: string;
  cardNumberMasked?: boolean;
}

const CreditCardFormFields: React.FC<CreditCardFormFieldsProps> = ({ 
  form, 
  handleInputChange, 
  cardNumberError,
  expiryError,
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
                    onChange={(e) => {
                      // Only allow digits and spaces, remove any other characters immediately
                      const value = e.target.value.replace(/[^\d\s]/g, '');
                      handleInputChange("cardNumber", value);
                    }}
                    onKeyDown={(e) => {
                      // Allow: backspace, delete, tab, escape, enter, home, end, left, right arrows
                      if ([8, 9, 27, 13, 46, 35, 36, 37, 39].indexOf(e.keyCode) !== -1 ||
                          // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+Z
                          (e.ctrlKey && [65, 67, 86, 88, 90].includes(e.keyCode))) {
                        return;
                      }
                      // Only allow numbers (0-9) and space
                      if (!((e.keyCode >= 48 && e.keyCode <= 57) || 
                            (e.keyCode >= 96 && e.keyCode <= 105) || 
                            e.keyCode === 32)) {
                        e.preventDefault();
                      }
                    }}
                    onInput={(e) => {
                      // Additional safety net - filter out any non-digit/space characters
                      const target = e.target as HTMLInputElement;
                      const value = target.value.replace(/[^\d\s]/g, '');
                      if (value !== target.value) {
                        target.value = value;
                      }
                    }}
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
                    className={expiryError ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                </FormControl>
                {expiryError && (
                  <p className="text-sm text-red-600">{expiryError}</p>
                )}
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
