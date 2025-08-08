import React from 'react';

const AttendeeList = ({ checkedIn = [], awaiting = [] }) => {
  const renderAttendee = (attendee, index) => (
    <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-orange-500/10 hover:border-orange-500/20 group">
      {/* Avatar */}
      <div className="attendee-avatar group-hover:scale-110">
        {attendee.PhotoURL ? (
          <img 
            src={attendee.PhotoURL} 
            alt={attendee.Name} 
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <span className={attendee.PhotoURL ? 'hidden' : ''}>
          {attendee.Name ? attendee.Name.charAt(0).toUpperCase() : '?'}
        </span>
      </div>
      
      {/* Attendee Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold truncate group-hover:text-orange-300 transition-colors">
          {attendee.Name || 'Unknown'}
        </p>
        {attendee.Role && (
          <p className="text-gray-400 text-sm truncate flex items-center">
            <span className="mr-2">🎯</span>
            {attendee.Role}
          </p>
        )}
      </div>
      
      {/* Status Badge */}
      <div className={`status-badge ${attendee.Status?.toLowerCase() === 'checked-in' ? 'status-checked-in' : 'status-awaiting'}`}>
        {attendee.Status || 'Unknown'}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Checked-In Section */}
      <div className="session-card p-8 fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="mr-3">✅</span>
            Checked In
          </h2>
          <div className="flex items-center space-x-3">
            <div className="live-indicator"></div>
            <span className="text-green-400 font-bold text-lg">
              {checkedIn.length} attendees
            </span>
          </div>
        </div>
        
        {checkedIn.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {checkedIn.map((attendee, index) => (
              <div key={index} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {renderAttendee(attendee, index)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">No attendees checked in yet</p>
          </div>
        )}
      </div>

      {/* Awaiting Section */}
      <div className="session-card p-8 fade-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <span className="mr-3">⏳</span>
            Awaiting Check-in
          </h2>
          <div className="flex items-center space-x-3">
            <div className="upcoming-indicator"></div>
            <span className="text-orange-400 font-bold text-lg">
              {awaiting.length} attendees
            </span>
          </div>
        </div>
        
        {awaiting.length > 0 ? (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {awaiting.map((attendee, index) => (
              <div key={index} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {renderAttendee(attendee, index)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-green-400 text-lg font-semibold">All attendees are checked in!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeList; 