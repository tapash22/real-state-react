import { ChangeEvent, FormEvent, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaLayerGroup } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dropdown } from "../components/dropdown/Dropdown";
import {
  emailValue,
  Errors,
  match,
  minLength,
  required,
  validate,
} from "../utils/validations/formValidation";

interface SignUpFormProps {}

// 1. Updated interface to match your exact backend structure
export interface UserSignUpPayload {
  email: string;
  password?: string;
  selectedCategories: string[];
}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const categoryOptions = [
    "Apartment",
    "Studio",
    "Shared Room",
    "Villa",
    "Penthouse",
  ];

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [selectedDropdownValue, setSelectedDropdownValue] =
    useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);

  // State used to print the final payload on the web page
  const [submittedData, setSubmittedData] = useState<UserSignUpPayload | null>(
    null,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showCpPassword, setShowCpPassword] = useState(false);

  const [errors, setErrors] = useState<
    Errors<{
      email: string;
      password: string;
      confirmPassword: string;
      categories: string;
    }>
  >({});

  const handleDropdownSelect = (item: string) => {
    setSelectedDropdownValue(item);
    if (!categories.includes(item)) {
      setCategories((prev) => [...prev, item]);
    }
  };

  const removeCategory = (itemToRemove: string) => {
    setCategories((prev) => prev.filter((cat) => cat !== itemToRemove));
  };

  const runValidation = () => {
    const newErrors = validate(
      {
        email,
        password,
        confirmPassword,
        categories: categories.length === 0 ? "" : "valid",
      },
      {
        email: [required("Email"), emailValue()],
        password: [required("Password"), minLength(6, "Password")],
        confirmPassword: [
          required("Confirm Password"),
          match("password", "Confirm Password"),
        ],
        categories: [required("At least one property category")],
      },
    );

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const signupFormHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!runValidation()) return;

    // 2. Build backend object with email, password, and selectedCategories
    const userPayload: UserSignUpPayload = {
      email: email,
      password: password,
      selectedCategories: categories,
    };

    // 3. Print to Console
    console.log("Backend Payload Output:", userPayload);

    // 4. Print to Web UI state
    setSubmittedData(userPayload);

    /* 
      // 5. Example API post call to your backend:
      try {
        const response = await fetch("https://your-api.com/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userPayload),
        });
        const data = await response.json();
        console.log("Backend response:", data);
      } catch (err) {
        console.error("Submission error:", err);
      }
    */
  };

  return (
    <div className="my-8 lg:my-16 w-full px-8 lg:px-16 transition-colors duration-300">
      <div className="flex flex-col justify-center items-center w-full space-y-3">
        <div className="p-2 flex flex-col justify-start space-y-2 w-full h-auto lg:w-1/3">
          <h1 className="text-xl font-bold text-[var(--text)] tracking-wider whitespace-nowrap">
            Create a free account
          </h1>
          <p className="text-sm font-medium tracking-wider text-[var(--muted)] text-wrap leading-relaxed">
            Every month, 260+ tenants and 30+ homeowners find their perfect fit
            on HousingAnywhere. Join them.
          </p>
        </div>

        <div className="p-2 flex flex-col justify-start space-y-2 w-full h-auto lg:w-1/3">
          <form onSubmit={signupFormHandler} className="space-y-4">
            <div className="flex flex-col space-y-1 w-full">
              <label className="input-label">Email</label>
              <input
                type="text"
                value={email}
                placeholder="Enter email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="input-field w-full"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5 w-full">
              <label className="input-label">Select Housing Preference</label>

              <Dropdown
                selectedValue={selectedDropdownValue}
                onSelect={handleDropdownSelect}
                options={categoryOptions}
                label="Choose a housing category"
                Icon={FaLayerGroup}
                showValue={true}
              />

              {errors.categories && (
                <span className="text-red-500 text-xs">
                  {errors.categories}
                </span>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                {categories.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1 bg-violet-100 text-violet-800 text-xs font-semibold px-2.5 py-1 rounded-full"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeCategory(item)}
                      className="text-violet-600 hover:text-violet-900 font-bold ml-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1 w-full">
              <label className="input-label">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  className="input-field pr-10 w-full"
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

            <div className="flex flex-col space-y-1 w-full">
              <label className="input-label">Confirm Password</label>
              <div className="relative w-full">
                <input
                  type={showCpPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="input-field pr-10 w-full"
                  placeholder="Confirm password"
                />
                <button
                  type="button"
                  onClick={() => setShowCpPassword((prev) => !prev)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] transition ${
                    confirmPassword.length === 0
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
                >
                  {!showCpPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="py-2 flex flex-col gap-4 w-full">
              <button
                type="submit"
                className="bg-violet-700 hover:bg-violet-800 text-white rounded-md p-4 text-sm font-semibold tracking-wider w-full transition cursor-pointer"
              >
                Sign Up
              </button>

              <div className="flex items-center w-full">
                <div className="flex-1 h-px bg-[var(--border)]"></div>
                <span className="px-3 text-xs text-[var(--text-secondary)]">
                  OR
                </span>
                <div className="flex-1 h-px bg-[var(--border)]"></div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 border-2 border-[var(--border)] rounded-md p-4 w-full hover:bg-[var(--card-hover)] text-[var(--muted)] transition bg-white text-sm font-medium tracking-wider cursor-pointer"
              >
                <FaGoogle size={20} className="text-[var(--primary)]" />
                Continue with Google
              </button>

              <Link
                to="/auth/signin"
                className="text-sm font-medium text-[var(--muted)] tracking-wide py-3 text-center lg:text-start whitespace-nowrap"
              >
                Already Have Account?
                <span className="px-1 text-[var(--primary)] text-md font-semibold underline tracking-wider">
                  SignIn
                </span>
              </Link>
            </div>
          </form>

          {/* Prints payload directly onto the webpage UI */}
          {submittedData && (
            <div className="mt-6 p-4 border border-[var(--border)] rounded-md bg-gray-50 dark:bg-gray-800 w-full">
              <h3 className="text-sm font-bold text-violet-700 mb-2">
                Payload Ready For Backend:
              </h3>
              <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-x-auto font-mono">
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
