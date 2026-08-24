import type { Errors } from "../../utils/validations/formValidation";

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInState {
  values: SignInFormValues;
  errors: Errors<SignInFormValues>;
  showPassword: boolean;
}

export type SignInAction =
  | {
      type: "SET_FIELD";
      field: keyof SignInFormValues;
      value: string;
    }
  | {
      type: "SET_ERRORS";
      errors: Errors<SignInFormValues>;
    }
  | {
      type: "TOGGLE_PASSWORD";
    }
  | {
      type: "RESET";
    };

export const initialSignInState: SignInState = {
  values: {
    email: "",
    password: "",
  },
  errors: {},
  showPassword: false,
};

export const signInReducer = (
  state: SignInState,
  action: SignInAction,
): SignInState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [action.field]: action.value,
        },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };

    case "TOGGLE_PASSWORD":
      return {
        ...state,
        showPassword: !state.showPassword,
      };

    case "RESET":
      return initialSignInState;

    default:
      return state;
  }
};
