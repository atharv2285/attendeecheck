import React from 'react';
import dayjs from 'dayjs';

const Header = ({ eventName = "DEMO DAY", eventDate = "August 10, 2025" }) => {
  const formattedDate = dayjs(eventDate).format('dddd, MMMM D, YYYY');
  
  return (
    <header className="text-center py-8 px-4 fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Event Logo */}
        <div className="mb-6 slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 via-red-600 to-orange-700 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-2xl pulse-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <span className="relative z-10 font-bold">DD</span>
          </div>
        </div>
        
        {/* Event Name */}
        <h1 className="text-5xl md:text-6xl font-bold mb-3 slide-in" style={{ animationDelay: '0.4s' }}>
          <span className="demo-day-gradient">
            {eventName}
          </span>
        </h1>
        
        {/* Event Date */}
        <p className="text-xl text-orange-300 font-medium mb-6 slide-in" style={{ animationDelay: '0.6s' }}>
          {formattedDate}
        </p>
        
        {/* Live Status Indicator */}
        <div className="flex items-center justify-center space-x-3 slide-in" style={{ animationDelay: '0.8s' }}>
          <div className="live-indicator"></div>
          <span className="text-orange-400 font-bold text-lg tracking-wider">LIVE NOW</span>
          <div className="live-indicator" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-4 opacity-30">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </header>
  );
};

export default Header; 