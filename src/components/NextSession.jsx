import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getTimeDifference, formatTimeDifference } from '../utils/fetchSheetData';

const NextSession = ({ session }) => {
  const [timeUntil, setTimeUntil] = useState(null);

  useEffect(() => {
    if (!session) return;

    const updateTime = () => {
      const timeDiff = getTimeDifference(session.startDateTime);
      setTimeUntil(timeDiff);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [session]);

  if (!session) {
    return (
      <div className="card p-6 mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Next Session</h2>
          <p className="text-gray-300">No upcoming sessions</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Coming Up Next</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-blue-400 font-medium text-sm">UPCOMING</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Session Title */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">
            {session.title}
          </h3>
          <p className="text-blue-300 font-medium">
            {session.speaker}
          </p>
        </div>
        
        {/* Time Information */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-gray-400 text-sm">Start Time</p>
            <p className="text-white font-medium">{session.startTime}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <p className="text-gray-400 text-sm">End Time</p>
            <p className="text-white font-medium">{session.endTime}</p>
          </div>
        </div>
        
        {/* Countdown */}
        {timeUntil && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-blue-500/30">
            <p className="text-gray-300 text-sm mb-1">Starts In</p>
            <p className="text-2xl font-bold text-white">
              {timeUntil.isPast ? 'Starting now' : formatTimeDifference(timeUntil)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NextSession; 