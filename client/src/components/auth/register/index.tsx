import { SIGN_UP_ROUTE } from "@/lib/constants";
import { loginInfoContext } from "@/lib/contexts";
import { apiClient } from "@/lib/utils";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { loginInfo, setLoginInfo } = useContext(loginInfoContext);
  const { email, password } = loginInfo;
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await apiClient.post(
        SIGN_UP_ROUTE,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Sign up was successful.");
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
        handleRegister();
      }}
      className="max-w-[90%] mx-auto"
    >
      <div className="grid grid-cols-2 gap-4 mx-auto ">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
      </div>

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
          placeholder="********"
          value={password}
          onChange={(e) =>
            setLoginInfo({ ...loginInfo, password: e.target.value })
          }
          className="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full p-3 bg-[var(--cyan)] text-white rounded-md hover:bg-[#26bebe]"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default Register;
