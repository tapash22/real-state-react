import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface SignUpFormProps {
  // add props later if needed
}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [user, setUser] = useState<string>("");
  const [pward, setPward] = useState<string>("");
  const [cpward, setCpward] = useState<string>("");

  const signupFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userObj = { user, pward, cpward };

    if (!user.length) {
      console.log("user name not found");
    }

    if (!pward.length) {
      console.log("password not found");
    }

    const match = pward === cpward;

    if (!match) {
      console.log("password not match");
    }

    if (user.length && pward.length && match) {
      console.log("new user created");
    }

    console.log(userObj);
  };

  return (
    <div className="flex justify-center py-10">
      <div className="min-w-[400px] p-3 shadow-xl rounded-xl border-4 border-violet-500">
        <h1 className="text-xl font-bold py-4 tracking-wider">SignUp Form</h1>

        <form onSubmit={signupFormHandler}>
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

          <div className="flex flex-col p-1">
            <label>Confirm Password</label>
            <input
              type="password"
              value={cpward}
              placeholder="User Confirm Password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCpward(e.target.value)
              }
              className="text-sm p-2 border border-red-300 rounded-lg"
            />
          </div>

          <div className="py-2 bg-white flex justify-start gap-x-2">
            <button
              type="submit"
              className="bg-violet-600 text-sm px-4 py-2 rounded-lg font-bold text-white"
            >
              SignUp
            </button>

            <Link
              to="/signin"
              className="underline text-xs text-violet-600 mt-2"
            >
              Already Have Account? SignIn
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
