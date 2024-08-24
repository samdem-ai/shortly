import { useEffect, useState } from "react";
import Logo from "/images/logo.svg";
import { Menu, X } from "lucide-react";
import { linksType } from "@/lib/types";
import { Button } from "../ui/button";
import { useStore } from "@/lib/store";
import { toast } from "sonner";
import { apiClient } from "@/lib/utils";
import { GET_USER_ROUTE, LOGOUT_ROUTE } from "@/lib/constants";

const Navbar = () => {
  const { userInfo, setUserInfo } = useStore();

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await apiClient.get(GET_USER_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log(response.data.user);
          setUserInfo(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyLogin();
  }, [setUserInfo]);

  const links: linksType[] = [
    { name: "Features", link: "#" },
    { name: "Pricing", link: "#" },
    { name: "Resources", link: "#" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleMenu = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  };

  const handleLogout = async () => {
    try {
      const response = await apiClient.get(LOGOUT_ROUTE, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success(response.data);
        setUserInfo({
          id: "",
          firstName: "",
          lastName: "",
          email: "",
        });
        window.location.replace("");
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
    <>
      <nav className="p-[2rem] flex justify-between items-center max-w-[1366px] mx-auto my-0 relative lg:hidden">
        <img className="cursor-pointer" src={Logo} alt="logo" />
        {!isOpen ? (
          <Menu
            className="lg:hidden w-10 h-10 text-[#34313D] cursor-pointer"
            onClick={handleToggleMenu}
          />
        ) : (
          <X
            className="lg:hidden w-10 h-10 text-[#34313D] cursor-pointer"
            onClick={handleToggleMenu}
          />
        )}
        <div
          className={`${
            !isOpen ? "translate-y-[-120vw]" : ""
          } transition-all duration-500 absolute bg-[var(--dark-violet)] left-[5%] top-[90%] w-[90%] rounded-lg flex flex-col items-center justify-center gap-5 py-10 lg:hidden`}
        >
          {links.map((link) => (
            <a
              key={link.name}
              className="text-white poppins-medium"
              href={link.link}
            >
              {link.name}
            </a>
          ))}
          <span className="w-[80%] h-[.5px] bg-[var(--grayish-violet)]" />
          {userInfo.id ? (
            <>
              <p className="text-white poppins-bold">
                Logged In as{" "}
                <span className="poppins-medium underline">
                  {userInfo.firstName} {userInfo.lastName}
                </span>
              </p>
              <Button
                onClick={handleLogout}
                className=" w-[60%] rounded-full py-5 px-4 bg-[var(--red)] poppins-bold"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <a href="/auth" className="text-white poppins-semibold">
                Login
              </a>
              <a href="/auth" className="text-center">
                <Button className="text-lg w-[80%] tracking-wider rounded-full py-7 px-10 bg-[var(--cyan)] poppins-bold">
                  Sign Up
                </Button>
              </a>
            </>
          )}
        </div>
      </nav>
      <nav className="hidden p-[2rem] lg:flex justify-between items-center max-w-[1366px] mx-auto my-0 relative ">
        <div className="flex gap-8 items-center">
          <img className="cursor-pointer" src={Logo} alt="logo" />
          <div className="flex gap-5">
            {links.map((link) => (
              <a
                key={link.name}
                className="text-[var(--gray)] poppins-medium"
                href={link.link}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:justify-end lg:w-full">
          <div className="flex gap-4 items-center">
            {userInfo.id ? (
              <>
                <p className="text-[var(--dark-violet)] poppins-bold whitespace-nowrap">
                  Logged In as{" "}
                  <span className="poppins-medium underline">
                    {userInfo.firstName} {userInfo.lastName}
                  </span>
                </p>
                <Button
                  onClick={handleLogout}
                  className=" w-[60%] rounded-full py-5 px-4 bg-[var(--red)] poppins-bold"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a className="text-[var(--gray)] poppins-semibold" href="/auth">
                  Login
                </a>
                <a href="/auth">
                  <Button className=" w-[100%] tracking-wider rounded-full py-5 px-8 bg-[var(--cyan)] poppins-bold">
                    Sign Up
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
