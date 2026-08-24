import { ChangeEvent, FormEvent, useReducer } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  emailValue,
  hasValidationErrors,
  minLength,
  required,
  validate,
} from "../../utils/validations/formValidation";

import { initialSignInState, signInReducer } from "./signInReducer";

const SignInForm = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(signInReducer, initialSignInState);

  const { values, errors, showPassword } = state;

  // --------------------------------
  // Validation Schema
  // --------------------------------

  const validationSchema = {
    email: [required("Email"), emailValue()],

    password: [required("Password"), minLength(6, "Password")],
  };

  // --------------------------------
  // Button Disabled State
  // --------------------------------

  const isFormInvalid = hasValidationErrors(values, validationSchema);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof values,
  ) => {
    dispatch({
      type: "SET_FIELD",
      field,
      value: e.target.value,
    });
  };

  const runValidation = () => {
    const newErrors = validate(values, validationSchema);

    dispatch({
      type: "SET_ERRORS",
      errors: newErrors,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!runValidation()) return;

    const userObj = {
      email: values.email,
      password: values.password,
    };

    console.log("Authenticated User Info:", userObj);

    dispatch({
      type: "RESET",
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={values.email}
        onChange={(e) => handleChange(e, "email")}
        placeholder="Enter email"
      />

      {errors.email && <span>{errors.email}</span>}

      <div>
        <input
          type={showPassword ? "text" : "password"}
          value={values.password}
          onChange={(e) => handleChange(e, "password")}
          placeholder="Enter password"
        />

        <button
          type="button"
          onClick={() =>
            dispatch({
              type: "TOGGLE_PASSWORD",
            })
          }
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>

      {errors.password && <span>{errors.password}</span>}

      <button
        type="submit"
        disabled={isFormInvalid}
        className={`text-[var(--text)] rounded-md p-4 text-sm font-semibold tracking-wider w-full transition ${
          isFormInvalid
            ? "bg-violet-400 opacity-50 cursor-not-allowed"
            : "bg-violet-700 hover:bg-violet-800"
        }`}
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
