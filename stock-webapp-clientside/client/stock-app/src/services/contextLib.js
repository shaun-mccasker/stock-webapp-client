import { useContext, createContext } from "react";

export const AppContext = createContext(null);
//create a global context for all pages
export function useAppContext() {
  return useContext(AppContext);
}
