import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface SignInFormProps {
  // add props later if needed
}

const SignInForm: React.FC<SignInFormProps> = () => {
  const [user, setUser] = useState<string>("");
  const [pward, setPward] = useState<string>("");
  const [cpward] = useState<string>("");

  const signinFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userObj = { user, pward, cpward };

    if (!user.length) {
      console.log("user name not found");
    }

    if (!pward.length) {
      console.log("password not found");
    }

    if (user.length && pward.length) {
      console.log("login user");
    }

    console.log(userObj);
  };

  return (
    <div className="flex justify-center py-10">
      <div className="min-w-[400px] p-3 shadow-xl rounded-xl border-4 border-violet-500">
        <h1 className="text-xl font-bold py-4 tracking-wider">SignIn Form</h1>

        <form onSubmit={signinFormHandler}>
          <div className="flex flex-col p-1">
            <label>User name</label>
            <input
              type="text"
              value={user}
              placeholder="User name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUser(e.target.value)
              }
              className="text-sm p-2 border border-red-300 rounded-lg"
            />
          </div>

          <div className="flex flex-col p-1">
            <label>User password</label>
            <input
              type="password"
              value={pward}
              placeholder="User Password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPward(e.target.value)
              }
              className="text-sm p-2 border border-red-300 rounded-lg"
            />
          </div>

          <div className="py-2 bg-white flex justify-start gap-x-2">
            <button
              type="submit"
              className="bg-violet-600 text-sm px-4 py-2 rounded-lg font-bold text-white"
            >
              SignIn
            </button>

            <Link
              to="/signup"
              className="underline text-xs text-violet-600 mt-2"
            >
              Register Account? SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
