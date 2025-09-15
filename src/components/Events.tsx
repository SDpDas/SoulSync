import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Heart, MessageCircle, Share, Video, Globe, UserPlus } from 'lucide-react';
import Footer from './Footer';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'virtual' | 'in-person';
  attendees: number;
  maxAttendees: number;
  location: string;
  description: string;
  organizer: string;
  category: string;
  price: string;
  image: string;
}

const Events: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'virtual' | 'in-person'>('all');
  const [joinedEvents, setJoinedEvents] = useState<Set<number>>(new Set());

  // Mock events data
  const [events] = useState<Event[]>([
    {
      id: 1,
      title: "AI Dating Workshop: Understanding Digital Body Language",
      date: "September 20, 2025",
      time: "7:00 PM - 9:00 PM",
      type: "virtual",
      attendees: 45,
      maxAttendees: 100,
      location: "Online via Zoom",
      description: "Learn how AI analyzes your digital behavior patterns to find better matches. Interactive workshop with live demonstrations and Q&A session.",
      organizer: "SoulSync Team",
      category: "Educational",
      price: "Free",
      image: "/events-1.jpg"
    },
    {
      id: 2,
      title: "Speed Dating Mixer: Tech Professionals",
      date: "September 22, 2025",
      time: "6:30 PM - 9:30 PM",
      type: "in-person",
      attendees: 28,
      maxAttendees: 50,
      location: "Downtown Community Center, San Francisco",
      description: "Connect with like-minded tech professionals in a fun, relaxed environment. AI-powered matching assistance available throughout the event.",
      organizer: "TechConnect Events",
      category: "Networking",
      price: "$25",
      image: "/events-2.jpg"
    },
    {
      id: 3,
      title: "Virtual Coffee Chat: Dating in the Digital Age",
      date: "September 25, 2025",
      time: "12:00 PM - 1:00 PM",
      type: "virtual",
      attendees: 67,
      maxAttendees: 80,
      location: "Online via SoulSync Platform",
      description: "Casual discussion about modern dating challenges and how technology can enhance human connection. Share experiences and tips with other users.",
      organizer: "SoulSync Community",
      category: "Discussion",
      price: "Free",
      image: "/events-3.jpg"
    }
  ]);

  // Filter events based on selected type
  const filteredEvents = events.filter(event => 
    activeFilter === 'all' || event.type === activeFilter
  );

  const handleJoinEvent = (eventId: number) => {
    const newJoinedEvents = new Set(joinedEvents);
    if (joinedEvents.has(eventId)) {
      newJoinedEvents.delete(eventId);
    } else {
      newJoinedEvents.add(eventId);
    }
    setJoinedEvents(newJoinedEvents);
    
    // Show alert
    const event = events.find(e => e.id === eventId);
    if (event) {
      alert(`You ${joinedEvents.has(eventId) ? 'left' : 'joined'} "${event.title}"!`);
    }
  };

  const getEventTypeIcon = (type: string) => {
    return type === 'virtual' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />;
  };

  const getEventTypeColor = (type: string) => {
    return type === 'virtual' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700';
  };

  return (
    <>
    <div className="min-h-screen py-8 bg-pink-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4">SoulSync Events</h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            Join our community events to connect, learn, and grow your dating journey
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
              activeFilter === 'all'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-200'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>All Events</span>
          </button>
          <button
            onClick={() => setActiveFilter('virtual')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
              activeFilter === 'virtual'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Virtual</span>
          </button>
          <button
            onClick={() => setActiveFilter('in-person')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
              activeFilter === 'in-person'
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 border border-gray-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>In-Person</span>
          </button>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your filter or check back later for new events</p>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="md:flex">
                  {/* Event Image */}
                  <div className="md:w-1/3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 md:h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Event Details */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {getEventTypeIcon(event.type)}
                        <span className="ml-1 capitalize">{event.type}</span>
                      </span>
                      <span className="text-sm font-medium text-gray-500">{event.price}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    
                    {/* Event Meta Information */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        {event.type === 'virtual' ? <Globe className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        <span className="text-sm">{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{event.attendees}/{event.maxAttendees} attendees</span>
                      </div>
                    </div>
                    
                    {/* Organizer */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        Organized by <span className="font-medium text-gray-700">{event.organizer}</span>
                      </p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-600 transition-colors duration-300">
                          <Heart className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-300">
                          <MessageCircle className="w-4 h-4" />
                          <span>Discuss</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors duration-300">
                          <Share className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleJoinEvent(event.id)}
                        className={`flex justify-center items-center space-x-1 px-6 py-2 rounded-full font-medium transition-colors duration-300 w-2/3 md:w-1/4 ${
                          joinedEvents.has(event.id)
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-pink-500 hover:bg-pink-600 text-white'
                        }`}
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>{joinedEvents.has(event.id) ? 'Joined' : 'Join Event'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>

  );
};

export default Events;
