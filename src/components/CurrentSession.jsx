import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getTimeDifference, formatTimeDifference } from '../utils/fetchSheetData';

const CurrentSession = ({ session }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!session) return;

    const updateTime = () => {
      const timeDiff = getTimeDifference(session.endDateTime);
      setTimeLeft(timeDiff);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [session]);

  if (!session) {
    return (
      <div className="session-card p-8 mb-6 fade-in">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Current Session</h2>
          <p className="text-gray-300">No session currently in progress</p>
        </div>
      </div>
    );
  }

  return (
    <div className="session-card p-8 mb-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <span className="mr-3">🎙️</span>
          Now Live
        </h2>
        <div className="flex items-center space-x-3">
          <div className="live-indicator"></div>
          <span className="text-orange-400 font-bold text-lg tracking-wider">LIVE</span>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Session Title */}
        <div className="slide-in" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
            {session.title}
          </h3>
          <p className="text-orange-300 font-semibold text-lg flex items-center">
            <span className="mr-2">👤</span>
            {session.speaker}
          </p>
        </div>
        
        {/* Time Information */}
        <div className="grid grid-cols-2 gap-4 slide-in" style={{ animationDelay: '0.4s' }}>
          <div className="time-info">
            <p className="text-gray-400 text-sm mb-1 flex items-center">
              <span className="mr-2">🕐</span>
              Start Time
            </p>
            <p className="text-white font-bold text-lg">{session.startTime}</p>
          </div>
          <div className="time-info">
            <p className="text-gray-400 text-sm mb-1 flex items-center">
              <span className="mr-2">⏰</span>
              End Time
            </p>
            <p className="text-white font-bold text-lg">{session.endTime}</p>
          </div>
        </div>
        
        {/* Countdown */}
        {timeLeft && (
          <div className="slide-in" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 rounded-xl p-6 border border-orange-500/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              <div className="relative z-10">
                <p className="text-gray-300 text-sm mb-2 flex items-center">
                  <span className="mr-2">⏱️</span>
                  Time Remaining
                </p>
                <p className="countdown-timer text-3xl">
                  {timeLeft.isPast ? 'Session ended' : formatTimeDifference(timeLeft)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentSession; 