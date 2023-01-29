import React, { ReactNode, useState } from "react";
//set our user for what we can pass to our use state
type User = {
  email: string | null;
  fName: string | null;
  lName: string | null;
  id: Number | null;
  isLoggedIn: boolean;
};
//attaches the set state as we need to pass both our use state and user to the context
export type UserState = User & {
  setUser: React.Dispatch<React.SetStateAction<User>> | null;
};

const userInitialState = {
  email: null,
  fName: null,
  lName: null,
  id: null,
  isLoggedIn: false,
};

export const AuthContext = React.createContext<UserState>({
  ...userInitialState,
  setUser: null,
});
//this component can now wrap all our other components to avoid prop drilling
export const AuthContextProvider = (props: { children?: ReactNode }) => {
  const [user, setUser] = useState<User>({
    ...userInitialState,
  });

  return (
    <AuthContext.Provider value={{ ...user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
