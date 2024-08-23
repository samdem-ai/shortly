import Register from "@/components/auth/register";
import Login from "@/components/auth/login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { loginInfoContext } from "@/lib/contexts";
import { loginInfoType } from "@/lib/types";

const Auth = () => {
  const [loginInfo, setLoginInfo] = useState<loginInfoType>({
    email: "",
    password: "",
  });
  return (
    <loginInfoContext.Provider value={{ loginInfo, setLoginInfo }}>
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-[url('/images/bg-auth.svg')]">
        <div className=" p-10 rounded-lg w-[90%] bg-white shadow-lg md:w-[60%] lg:w-[45%]">
          <Tabs
            defaultValue="login"
            className="flex flex-col justify-center items-center "
          >
            <TabsList className="poppins-medium">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Sign Up</TabsTrigger>
            </TabsList>
            <h1 className="poppins-bold mt-10 text-xl text-[var(--dark-violet)] mb-3">
              Welcome
            </h1>
            <p className="poppins-medium text-[var(--gray)] text-center mb-10 max-w-[400px]">
              Please login or register to enjoy this great link shortening
              website!
            </p>
            <TabsContent value="login" className="w-full">
              <Login />
            </TabsContent>
            <TabsContent value="register" className="w-full">
              <Register />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </loginInfoContext.Provider>
  );
};

export default Auth;
