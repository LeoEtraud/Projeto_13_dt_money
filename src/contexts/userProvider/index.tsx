import { createContext } from "react";
import { IAuthProvider, IContext } from "./types";

export const AuthContext = createContext({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
