import { Link, NavLink } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";
import { useSelector } from "react-redux";
import { Wallet } from "lucide-react";
import { IconUser } from "@tabler/icons-react";
import { useState } from "react";

export default function Header({ events, setFilteredEvents, setSearchQuery }) {
  const { accessToken, user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(accessToken);
  const isAuthorised = user?.role === "admin" || user?.role === "organizer";
  const [search, setSearch] = useState("");
  

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setSearchQuery(value); // 🔹 update parent searchQuery

    if (value.trim() === "") {
      setFilteredEvents([]); // no events when empty
      return;
    }


    // filter events based on title, description, etc.
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(value) ||
      event.description.toLowerCase().includes(value)
    );
    setFilteredEvents(filtered);
  };

  return (
    <header className="w-full bg-gradient-to-r from-black via-blue-800 to-black shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold tracking-wide">
          Event<span className="text-yellow-300">Ease</span>
        </Link>


        {/* Center Section: Search Bar */}
        <div className="flex-grow md:ml-56  mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full md:w-126 border-2 px-4 py-2 rounded-full focus:outline-none shadow text-slate-400"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Right Section */}
        {!isLoggedIn ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-purple-700 rounded-full font-semibold shadow hover:bg-yellow-300 hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-yellow-300 text-black rounded-full font-semibold shadow hover:bg-white hover:text-purple-700 transition"
            >
              Join Now
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            {/* Wallet Points */}
            <div className="flex items-center space-x-2 px-4 py-2 hover:bg-white bg-white rounded-full shadow">
              <Wallet className="text-purple-700 text-xl font-semibold" />
              <span className="font-semibold text-black">
                {user?.walletPoints ?? 0} pts
              </span>
            </div>

            {/* Logout Button */}
            <LogoutBtn />
            {/* Profile Icon */}
            <Link to="/profile" className="flex items-center">
              <IconUser className="text-white text-3xl hover:text-yellow-300 transition" />
            </Link>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="hidden max-w-7xl mx-auto px-6 py-4 md:flex items-center space-x-8 text-white font-medium">
        <div className="flex items-center space-x-8">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${
              isActive ? "text-yellow-300" : "text-white"
            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-yellow-300 lg:p-0`
          }
        >
          Home
        </NavLink>

        <NavLink 
        to="/events"        
        className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${
              isActive ? "text-yellow-300" : "text-white"
            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-yellow-300 lg:p-0`}>
          Events
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${
              isActive ? "text-yellow-300" : "text-white"
            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-yellow-300 lg:p-0`
          }
        >
          Contact Us
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${
              isActive ? "text-yellow-300" : "text-white"
            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-yellow-300 lg:p-0`
          }
        >
          About
        </NavLink>
        </div>
     
      { isAuthorised && (
        <div className="ml-auto flex items-center space-x-6"> 
        <NavLink
          to="/create-event"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${
              isActive ? "text-green-500" : "text-white"
            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0`
          }
        >
          Add Event
        </NavLink>
          <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block py-2 pr-4 pl-3 duration-200 ${
              isActive ? "text-green-500" : "text-white"
            } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-green-500 lg:p-0`
          }
        >
          Dashboard
        </NavLink>
        </div>
        )}
      </nav>
    </header>
  );
}
