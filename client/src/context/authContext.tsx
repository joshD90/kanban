import React, { ReactNode, useState, useEffect } from "react";
//set our user for what we can pass to our use state
export type User = {
  email: string | null;
  fName: string | null;
  lName: string | null;
  id: number | null;
  isLoggedIn: boolean;
};
//attaches the set state as we need to pass both our use state and user to the context
export type UserState = User & {
  setUser: React.Dispatch<React.SetStateAction<User>> | null;
};

export const userInitialState = {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserInitialState = async (): Promise<void> => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/auth/user-data`;
        const response = await fetch(url, { credentials: "include" });
        const userData = await response.json();
        if (!response.ok) {
          setUser(userInitialState);
          setLoading(false);
        }

        setUser(userData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return setUser(userInitialState);
      }
    };
    getUserInitialState();
  }, []);
  //we are checking with the server to see whether we have a valid user on reload. We dont want to redirect to the login page until we recieve this information
  if (loading)
    return (
      <div className="bg-stone-800 flex items-center justify-center h-screen w-screen text-stone-50">
        ...Loading
      </div>
    );

  return (
    <AuthContext.Provider value={{ ...user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
