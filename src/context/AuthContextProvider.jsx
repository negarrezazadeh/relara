import { createContext, useContext, useMemo } from "react";

import { useUser } from "@/features/authentication/useUser";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const { user, isAdmin } = useUser();
  const value = useMemo(() => {
    return { user, isAdmin };
  }, [user, isAdmin]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthContextProvider;
