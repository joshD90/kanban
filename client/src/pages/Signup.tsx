import { FormEvent } from "react";

const Signup = () => {
  const createAccount = (e: FormEvent) => {
    e.preventDefault();
    console.log("creating account");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-stone-800 items-center justify-center">
      <div className="w-full sm:w-1/2 lg:w-1/3 min-w-fit border-stone-50 border-2 rounded-md bg-stone-600">
        <form onSubmit={createAccount} className="flex flex-col gap-2 p-2">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-stone-800">
              email
            </label>
            <input id="id" className="p-1 rounded-sm text-stone-900" />
          </div>
          <div className="flex flex-col">
            <label className="text-stone-800">password</label>
            <input
              id="password"
              type="password"
              className="p-1 rounded-sm text-stone-900"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="passwordConfirm" className="text-stone-800">
              confirm password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="p-1 rounded-sm text-stone-900"
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
