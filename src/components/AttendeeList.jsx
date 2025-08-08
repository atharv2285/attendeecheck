import React from 'react';

const AttendeeList = ({ checkedIn = [], awaiting = [] }) => {
  const renderAttendee = (attendee, index) => (
    <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
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
        <p className="text-white font-medium truncate">{attendee.Name || 'Unknown'}</p>
        {attendee.Role && (
          <p className="text-gray-400 text-sm truncate">{attendee.Role}</p>
        )}
      </div>
      
      {/* Status Badge */}
      <div className={`status-badge ${attendee.Status?.toLowerCase() === 'checked-in' ? 'status-checked-in' : 'status-awaiting'}`}>
        {attendee.Status || 'Unknown'}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Checked-In Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Checked In</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-400 font-medium text-sm">
              {checkedIn.length} attendees
            </span>
          </div>
        </div>
        
        {checkedIn.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {checkedIn.map((attendee, index) => renderAttendee(attendee, index))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No attendees checked in yet</p>
          </div>
        )}
      </div>

      {/* Awaiting Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Awaiting Check-in</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-yellow-400 font-medium text-sm">
              {awaiting.length} attendees
            </span>
          </div>
        </div>
        
        {awaiting.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {awaiting.map((attendee, index) => renderAttendee(attendee, index))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">All attendees are checked in!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeeList; 