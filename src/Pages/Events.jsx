import React, { useEffect, useState } from 'react'
import { getAllEvents } from '../Services/EventServices/eventapi';
import { Link } from 'react-router-dom';
import { EventCard } from '../Components/Cards/EventCard';
function Events() {

    const[events,setEvents] = useState([]);

    useEffect(()=>{
        const fetchEvents = async() =>{
            try{
                const response = await getAllEvents();
                // console.log("Fetched Events:", response);
                setEvents(response.data || []);
            }catch(error){
                console.log(error);
            }
        };
        fetchEvents();

    },[])
return (
  <div className="py-6 px-36 bg-gradient-to-r from-black via-blue-800 to-black shadow-lg ">
    <label title='Upcoming Events'> 
    <h2 className="text-lg font-bold  mb-8 text-yellow-300">
    Upcoming Events
    </h2>

    {/* Grid Wrapper */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.values(events).filter((event) => event.status === "upcoming").length > 0  ? (
        Object.values(events)
        .filter((event) => event.status ==="upcoming") 
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort latest first
        .map((event) => (
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
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No Upcoming events Available.
        </p>
      )}
    </div>
    </label>
    <label title='Past Events' className='mt-12'>
    <h2 className="text-lg font-bold mt-8  mb-8 text-green-500">
    Past Events
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
      {Object.values(events).filter((event) => (event.status ==="past" || event.status ==="completed")).length > 0  ? (
        Object.values(events)
         .filter((event) => (event.status ==="past" || event.status ==="completed")) 
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort latest first
        .map((event) => (
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
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          No Past events found.
        </p>
      )}
    </div>
    </label>
  </div>
);
}

export default Events;