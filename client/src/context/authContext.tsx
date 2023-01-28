import React, { ReactNode, useState } from "react";
//set our user for what we can pass to our use state
type User = {
  email: string | null;
  loggedIn: boolean;
};
//attaches the set state as we need to pass both our use state and user to the context
export type UserState = User & {
  setUser: React.Dispatch<React.SetStateAction<User>> | null;
};

export const AuthContext = React.createContext<UserState>({
  email: null,
  loggedIn: false,
  setUser: null,
});
//this component can now wrap all our other components to avoid prop drilling
export const AuthContextProvider = (props: { children?: ReactNode }) => {
  const [user, setUser] = useState<User>({ email: null, loggedIn: false });

  return (
    <AuthContext.Provider value={{ ...user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
