export type ValidatorFn<T> = (value: any, values: T) => string | null;

export type ValidationSchema<T, E = Record<string, any>> = {
  [K in keyof T | keyof E]?: ValidatorFn<T>[];
};

export type Errors<E = Record<string, any>> = {
  [K in keyof E]?: string;
};

// --- Reusable Core Validators ---

export const required =
  <T>(label = "Field"): ValidatorFn<T> =>
  (value) =>
    value && value.toString().trim() ? null : `${label} is required`;

export const emailValue =
  <T>(): ValidatorFn<T> =>
  (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value || "") ? null : "Invalid email address";
  };

export const minLength =
  <T>(length: number, label = "Field"): ValidatorFn<T> =>
  (value) =>
    value?.length >= length
      ? null
      : `${label} must be at least ${length} characters`;

export const match =
  <T>(field: keyof T, label = "Field"): ValidatorFn<T> =>
  (value, values) =>
    value === values[field] ? null : `${label} does not match`;

// --- Custom Checkout Validators ---

export const mustBeTrue =
  <T>(message: string): ValidatorFn<T> =>
  (value) =>
    value === true ? null : message;

export const isAfterDate =
  <T extends Record<string, any>>(
    startDateField: keyof T,
    message: string,
  ): ValidatorFn<T> =>
  (value, values) => {
    const startDate = values[startDateField];

    if (!value || !startDate) return null;

    return new Date(value as string | number | Date) >
      new Date(startDate as string | number | Date)
      ? null
      : message;
  };

export const minNumber =
  <T>(min: number, message: string): ValidatorFn<T> =>
  (value) => {
    if (value === undefined || value === null || value === "") return null;
    return Number(value) > min ? null : message;
  };

export const requiredNestedProperty =
  <T>(path: string, message: string): ValidatorFn<T> =>
  (_value, values) => {
    const keys = path.split(".");
    let current: any = values;
    for (const key of keys) {
      current = current?.[key];
    }
    return current ? null : message;
  };

// --- CORE VALIDATOR ENGINE ---

export const validate = <
  T extends Record<string, any>,
  E = Record<string, any>,
>(
  values: T,
  schema: ValidationSchema<T, E>,
): Errors<E> => {
  const errors: Errors<E> = {};

  for (const key in schema) {
    const validators = schema[key];

    if (!validators) continue;

    for (const validator of validators) {
      const error = validator(values[key as keyof T], values);

      if (error) {
        errors[key as unknown as keyof E] = error;
        break;
      }
    }
  }

  return errors;
};
