import { LOGIN_ROUTE } from "@/lib/constants";
import { loginInfoContext } from "@/lib/contexts";
import { apiClient } from "@/lib/utils";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const { loginInfo, setLoginInfo } = useContext(loginInfoContext);
  const { email, password } = loginInfo;

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("Welcome back.");
        navigate("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="max-w-[90%] mx-auto"
    >
      <div className="mt-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, email: e.target.value })
          }
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          placeholder="********"
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full p-3 bg-[var(--cyan)] text-white rounded-md hover:bg-[#26bebe]"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
