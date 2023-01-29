import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchCreateUser } from "../utils/fetch/fetchCreateUser";

export type SignUpDetails = {
  email: string;
  fName: string;
  lName: string;
  password: string;
  passwordConfirm: string;
};

const Signup = () => {
  const [details, setDetails] = useState<SignUpDetails>({
    email: "",
    fName: "",
    lName: "",
    password: "",
    passwordConfirm: "",
  });

  const navigate = useNavigate();

  const createAccount = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    //check to see whether any of the values are empty
    if (Object.values(details).some((value) => value === ""))
      return console.log("need to fill out all inputs");
    if (details.password !== details.passwordConfirm)
      return console.log("Passwords need to match");
    //returns a boolean depending on successful response
    const success = await fetchCreateUser(details);
    if (!success) console.log("There was an issue with creating your account");
    //if successful redirect to login page
    navigate("/login");
  };

  //change details
  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="w-full h-screen flex flex-col bg-stone-800 items-center justify-center">
      <div className="w-1/3 min-w-96 border-2 border-stone-50 min-h-96 bg-stone-500 rounded-md">
        <form onSubmit={createAccount} className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-stone-800">
              Email GIVE ME A TOOLTIP
            </label>
            <input
              id="email"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fName" className="text-stone-800">
              First Name
            </label>
            <input
              id="fName"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lName" className="text-stone-800">
              Last Name
            </label>
            <input
              id="lName"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-stone-800">Password</label>
            <input
              id="password"
              type="password"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="passwordConfirm" className="text-stone-800">
              Confirm password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="p-1 rounded-sm text-stone-900"
              onChange={handleDetailsChange}
              required
            />
          </div>
          <button className="p-2 text-stone-50 text-bold bg-lime-600 hover:bg-lime-500 mt-5 rounded-sm">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
