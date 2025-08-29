// EventList.jsx
import React from "react";
import { Link } from "react-router-dom";
import { EventCard } from "../Cards/EventCard";

const EventList = ({ events, searchQuery }) => {
  // If search query is empty → render nothing
  if (!searchQuery || searchQuery.trim() === "") {
    return null;
  }

  // If no matching events found → show "No events found"
  if (!events || events.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6 px-36 bg-gradient-to-r from-black via-blue-800 to-black">
        No events found.
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 py-6 px-36  bg-gradient-to-r from-black via-blue-800 to-black">
      {events.map((event) => (
          <Link key={event._id} to={`/events/${event._id}`}>
            <EventCard
              organizer={event.organizer?.name || "Unknown Organizer"}
              image={event.image}
              title={event.title}
              description={
                event.description
                  ? event.description.slice(0, 100) +
                    (event.description.length > 100 ? "..." : "")
                  : ""
              }
              date={event.date}
              avgRating={event.avgRating}
              price={event.Price}
            />
          </Link>
        ))}
    </div>
  );
};

export default EventList;
