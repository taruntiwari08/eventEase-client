import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { getUserProfile } from "./Services/authServices/authapi";
import { logout, setCredentials } from "./store/authslice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const token = accessToken || localStorage.getItem("accessToken");

    if (!token) {
      dispatch(logout());
      setLoading(false);
      return;
    }

    getUserProfile(token)
      .then((userData) => {
        if (userData) {
          dispatch(
            setCredentials({
              user: userData, // ✅ correctly set user object
              accessToken: token,
            })
          );
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("App.jsx :: error in getUserProfile", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [accessToken, dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
