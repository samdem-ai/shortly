import { createContext } from "react";
import { loginInfoType } from "./types";

type loginInfoContextType = {
  loginInfo: loginInfoType,
  setLoginInfo: React.Dispatch<React.SetStateAction<loginInfoType>>
}

const loginInfo = {
  loginInfo: { email: "", password: "" },
  setLoginInfo: () => ({ email: "", password: "" })
}

export const loginInfoContext = createContext<loginInfoContextType>(loginInfo);