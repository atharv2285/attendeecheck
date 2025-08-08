import React from 'react';
import dayjs from 'dayjs';

const Header = ({ eventName = "Tech Conference 2024", eventDate = "December 15, 2024" }) => {
  const formattedDate = dayjs(eventDate).format('dddd, MMMM D, YYYY');
  
  return (
    <header className="text-center py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Event Logo */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {eventName.charAt(0)}
          </div>
        </div>
        
        {/* Event Name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {eventName}
        </h1>
        
        {/* Event Date */}
        <p className="text-xl text-blue-200 font-medium">
          {formattedDate}
        </p>
        
        {/* Live Status Indicator */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-medium">LIVE</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 