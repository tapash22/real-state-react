import { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  emailValue,
  Errors,
  minLength,
  required,
  validate,
} from "../utils/validations/formValidation";

interface SignInFormProps {
  // add props later if needed
}

const SignInForm: React.FC<SignInFormProps> = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // show and hide password handle condition
  const [showPassword, setShowPassword] = useState(false);

  // handle errors
  const [errors, setErrors] = useState<
    Errors<{
      email: string;
      password: string;
    }>
  >({});

  // PRO VALIDATION
  const runValidation = () => {
    const newErrors = validate(
      {
        emailValue: email,
        password,
      },
      {
        emailValue: [required("Email"), emailValue()],
        password: [required("Password"), minLength(6, "Password")],
      },
    );

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const signinFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate first
    if (!runValidation()) return;

    const userObj = {
      email: email,
      password: password,
    };

    console.log("Authenticated User Info:", userObj);

    // reset form
    resetForm();

    // redirect to signin page
    navigate("/");
  };

  const resetForm = () => {
    // reset form
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="my-8 lg:my-16 w-full px-8 lg:px-16 transition-colors duration-300">
      <div className="flex flex-col justify-center items-center w-full space-y-3">
        {/* header of form */}
        <div className="p-2 flex flex-col justify-start space-y-2 w-full h-auto lg:w-1/3 ">
          <h1 className="text-xl font-bold text-[var(--text)] tracking-wider whitespace-nowrap">
            Welcome back
          </h1>
          <p className="text-sm font-medium tracking-wider text-[var(--muted)] text-wrap leading-relaxed">
            Good to see you again.
          </p>
        </div>
        {/* header of form end*/}

        {/* main form signup */}
        <div className="p-2 flex flex-col justify-start space-y-2 w-full h-auto lg:w-1/3">
          <form onSubmit={signinFormHandler} className="space-y-3">
            <div className="flex flex-col space-y-1">
              <label className="input-label">Email</label>
              <input
                type="text"
                value={email}
                placeholder="Enter email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="input-field"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="input-label">Password</label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="input-field pr-10"
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] transition ${
                    password.length === 0
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password}</span>
              )}
            </div>

            <div className="py-2 flex flex-col gap-4">
              <button className="bg-violet-700 hover:bg-violet-800 text-[var(--text)] rounded-md p-4 text-sm font-semibold tracking-wider w-full transition">
                Sign In
              </button>

              {/* OR Divider */}
              <div className="flex items-center w-full">
                <div className="flex-1 h-px bg-[var(--border)]"></div>
                <span className="px-3 text-xs text-[var(--text-secondary)]">
                  OR
                </span>
                <div className="flex-1 h-px bg-[var(--border)]"></div>
              </div>

              <button className="flex items-center justify-center gap-2 border-2 border-[var(--border)] rounded-md p-4 w-full hover:bg-[var(--card-hover)] text-[var(--muted)] transition bg-white text-sm font-medium tracking-wider">
                <FaGoogle size={20} className="text-[var(--primary)]" />
                Continue with Google
              </button>

              <Link
                to="/auth/signup"
                className="text-sm font-medium text-[var(--muted)] tracking-wide py-3 text-center lg:text-start "
              >
                Don't Have any Account?
                <span className="px-1 text-[var(--primary)] text-md font-semibold underline tracking-wider">
                  SignUp
                </span>
              </Link>
            </div>
          </form>
        </div>
        {/* main form signup end*/}
      </div>
    </div>
  );
};

export default SignInForm;
