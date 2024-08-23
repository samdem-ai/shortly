import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Auth from "./pages/auth";
import NotFound from "./pages/not-found";
import { useEffect } from "react";
import { apiClient } from "./lib/utils";
import { GET_USER_ROUTE } from "./lib/constants";
import { useStore } from "./lib/store";

function App() {
  const { userInfo, setUserInfo } = useStore();
  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const response = await apiClient.get(GET_USER_ROUTE, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyLogin();
  }, [setUserInfo]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <Home />
              </div>
            }
          />
          <Route
            path="/auth"
            element={
              !userInfo.id ? (
                <div>
                  <Auth />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="*"
            element={
              <div>
                <NotFound />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
