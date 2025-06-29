
import { CardNumberField } from "./fields/CardNumberField";
import { CardholderNameField } from "./fields/CardholderNameField";
import { ExpiryDateField } from "./fields/ExpiryDateField";
import { CVCField } from "./fields/CVCField";
import { ZipCodeField } from "./fields/ZipCodeField";
import { MakeDefaultCheckbox } from "./fields/MakeDefaultCheckbox";

interface CreditCardFormSectionProps {
  cardName: string;
  setCardName: (value: string) => void;
  cardNumber: string;
  setCardNumber: (value: string) => void;
  expiry: string;
  setExpiry: (value: string) => void;
  cvc: string;
  setCvc: (value: string) => void;
  zipCode: string;
  setZipCode: (value: string) => void;
  isLoading?: boolean;
  showMakeDefaultOption?: boolean;
  makeDefault?: boolean;
  onMakeDefaultChange?: (checked: boolean) => void;
}

export const CreditCardFormSection = ({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvc,
  setCvc,
  zipCode,
  setZipCode,
  isLoading = false,
  showMakeDefaultOption = false,
  makeDefault = false,
  onMakeDefaultChange,
}: CreditCardFormSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardholderNameField 
          cardName={cardName}
          setCardName={setCardName}
          isLoading={isLoading}
        />
        <CardNumberField 
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          isLoading={isLoading}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <ExpiryDateField 
          expiry={expiry}
          setExpiry={setExpiry}
          isLoading={isLoading}
        />
        <CVCField 
          cvc={cvc}
          setCvc={setCvc}
          isLoading={isLoading}
        />
      </div>
      
      <ZipCodeField 
        zipCode={zipCode}
        setZipCode={setZipCode}
        isLoading={isLoading}
      />

      {showMakeDefaultOption && onMakeDefaultChange && (
        <MakeDefaultCheckbox 
          makeDefault={makeDefault}
          onMakeDefaultChange={onMakeDefaultChange}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
