import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function SignInForm(props) {
  const [user, setUser] = useState("");
  const [pward, setPward] = useState("");
  const [cpward, setCpward] = useState("");
  const [error, setError] = useState(false);
  const [sussess, setSusseess] = useState(true);

  const userRef = useRef();

  const signinFormHandler = (e) => {
    e.preventDefault();
    const userObj = { user, pward, cpward };
    

    if (userObj) {
      if (!user.length) {
        console.log("user name not found");
      }
      if (!pward.length) {
        console.log("password not found");
      }
      console.log('login user')

    }else{
        console.log("auth issue");
    }
    console.log(userObj)

  };

  return (
    <div>
      <div className="flex justify-center py-10">
        <div className="min-w-[400px] p-3 shadow-xl rounded-xl border-4 border-violet-500">
          <h1 className="text-xl font-bold py-4 tracking-wider ">SignIn Form</h1>

          <form onSubmit={signinFormHandler}>
            <div className="flex flex-col p-1">
              <label className="flex justify-start"> User name</label>
              <input
                type="text"
                value={user}
                placeholder="User name"
                onChange={(e) => setUser(e.target.value)}
                className="text-sm p-2 border border-red-300 rounded-lg "
              />
            </div>
            <div className="flex flex-col p-1">
              <label className="flex justify-start"> User password</label>
              <input
                type="password"
                value={pward}
                placeholder="User Password"
                onChange={(e) => setPward(e.target.value)}
                className="text-sm p-2 border border-red-300 rounded-lg "
              />
            </div>
            <div className="py-2 bg-white flex justify-start gap-x-2">
              <button className="bg-violet-600 text-sm px-4 py-2 rounded-lg font-bold text-white">
                SignUp
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
    </div>
  );
}

export default SignInForm;
