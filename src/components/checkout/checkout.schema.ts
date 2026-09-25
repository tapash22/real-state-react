import { CheckoutErrors, CheckoutFormData, CheckoutStep } from "../../data";
import {
  ValidationSchema,
  emailValue,
  isAfterDate,
  minNumber,
  mustBeTrue,
  required,
  requiredNestedProperty,
} from "../../utils/validations/formValidation";

export const step1Schema: ValidationSchema<CheckoutFormData, CheckoutErrors> = {
  moveInDate: [required("Please select a move-in date")],
  moveOutDate: [
    required("Please select a move-out date"),
    isAfterDate("moveInDate", "Move-out date must be after the move-in date."),
  ],
};

export const step2Schema: ValidationSchema<CheckoutFormData, CheckoutErrors> = {
  fullName: [required("Full name")],
  email: [required("Email address"), emailValue()],
  phone: [required("Phone number")],
  currentAddress: [required("Current address")],
};

export const step3Schema: ValidationSchema<CheckoutFormData, CheckoutErrors> = {
  organization: [required("University or employer")],
  monthlyIncome: [
    required("Monthly income"),
    minNumber(0, "Monthly income must be greater than 0."),
  ],
  passport: [
    requiredNestedProperty(
      "filesUploaded.passport",
      "Please upload your passport or government ID.",
    ),
  ],
  income: [
    requiredNestedProperty(
      "filesUploaded.income",
      "Please upload your proof of income.",
    ),
  ],
};

export const step4Schema: ValidationSchema<CheckoutFormData, CheckoutErrors> = {
  agreeTerms: [mustBeTrue("You must accept the terms before submitting.")],
};

export const STEP_SCHEMAS: Record<
  CheckoutStep,
  ValidationSchema<CheckoutFormData, CheckoutErrors>
> = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
};
