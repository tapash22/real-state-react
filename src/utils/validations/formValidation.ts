export type ValidatorFn<T> = (value: any, values: T) => string | null;

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidatorFn<T>[];
};

export type Errors<T> = {
  [K in keyof T]?: string;
};

// reusable validators
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

// CORE VALIDATOR ENGINE
export const validate = <T extends Record<string, any>>(
  values: T,
  schema: ValidationSchema<T>,
): Errors<T> => {
  const errors: Errors<T> = {};

  for (const key in schema) {
    const validators = schema[key];

    if (!validators) continue;

    for (const validator of validators) {
      const error = validator(values[key], values);

      if (error) {
        errors[key] = error;
        break;
      }
    }
  }

  return errors;
};
