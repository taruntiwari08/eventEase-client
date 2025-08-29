import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { getUserProfile } from "./Services/authServices/authapi";
import { logout, setCredentials } from "./store/authslice";
import { getAllEvents } from "./Services/EventServices/eventapi";
import EventList from "./Components/Header/SearchEvents";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [events, setEvents] = useState([]); 
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchQuery, setSearchQuery] = useState("");


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

     useEffect(()=>{
         const fetchEvents = async() =>{
             try{
                 const response = await getAllEvents();
                 setEvents(response.data || []);
             }catch(error){
                 console.log(error);
             }
         };
         fetchEvents();
 
     },[])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full">
        <Header events={events} setFilteredEvents={setFilteredEvents} setSearchQuery={setSearchQuery} />
        <EventList events={filteredEvents} searchQuery={searchQuery} />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
