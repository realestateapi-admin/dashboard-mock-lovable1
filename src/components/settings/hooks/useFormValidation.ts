
import { useState } from 'react';
import { NewUser, ROLES } from '../types/userRoles';

export const useFormValidation = () => {
  const [newUser, setNewUser] = useState<NewUser>({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    role: ROLES.ADMIN.value 
  });
  
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateName = (name: string) => {
    // Check minimum length
    if (name.length < 1) {
      return { isValid: false, error: "This field is required" };
    }
    
    // Check maximum length
    if (name.length > 50) {
      return { isValid: false, error: "Must be 50 characters or less" };
    }
    
    // Check for at least one alphanumeric character
    const hasAlphanumeric = /[a-zA-Z0-9]/.test(name);
    if (!hasAlphanumeric) {
      return { isValid: false, error: "Must contain at least one letter or number" };
    }
    
    return { isValid: true, error: "" };
  };

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailValue.trim()) {
      return { isValid: false, error: "" };
    }
    
    if (!emailRegex.test(emailValue)) {
      return { isValid: false, error: "Please enter a valid email address" };
    }
    
    return { isValid: true, error: "" };
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, firstName: value });
    
    const validation = validateName(value);
    setFirstNameError(validation.error);
    setIsFirstNameValid(validation.isValid);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, lastName: value });
    
    const validation = validateName(value);
    setLastNameError(validation.error);
    setIsLastNameValid(validation.isValid);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, email: value });
    
    const validation = validateEmail(value);
    setEmailError(validation.error);
    setIsEmailValid(validation.isValid);
  };

  const resetForm = () => {
    setNewUser({ firstName: "", lastName: "", email: "", role: ROLES.ADMIN.value });
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setIsFirstNameValid(false);
    setIsLastNameValid(false);
    setIsEmailValid(false);
  };

  const validateAllFields = () => {
    const firstNameValidation = validateName(newUser.firstName);
    const lastNameValidation = validateName(newUser.lastName);
    const emailValidation = validateEmail(newUser.email);
    
    setFirstNameError(firstNameValidation.error);
    setLastNameError(lastNameValidation.error);
    setEmailError(emailValidation.error);
    setIsFirstNameValid(firstNameValidation.isValid);
    setIsLastNameValid(lastNameValidation.isValid);
    setIsEmailValid(emailValidation.isValid);

    return firstNameValidation.isValid && lastNameValidation.isValid && emailValidation.isValid;
  };

  return {
    newUser,
    setNewUser,
    firstNameError,
    lastNameError,
    emailError,
    isFirstNameValid,
    isLastNameValid,
    isEmailValid,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    resetForm,
    validateAllFields
  };
};
