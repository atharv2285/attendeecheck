import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentSession from './components/CurrentSession';
import NextSession from './components/NextSession';
import AttendeeList from './components/AttendeeList';
import { 
  fetchAttendees, 
  fetchSchedule, 
  getCurrentSession, 
  getNextSession 
} from './utils/fetchSheetData';

function App() {
  const [attendees, setAttendees] = useState({ checkedIn: [], awaiting: [] });
  const [schedule, setSchedule] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [nextSession, setNextSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data
  const fetchData = async () => {
    try {
      setError(null);
      
      // Fetch attendees and schedule in parallel
      const [attendeesData, scheduleData] = await Promise.all([
        fetchAttendees(),
        fetchSchedule()
      ]);
      
      setAttendees(attendeesData);
      setSchedule(scheduleData);
      
      // Determine current and next sessions
      const current = getCurrentSession(scheduleData);
      const next = getNextSession(scheduleData);
      
      setCurrentSession(current);
      setNextSession(next);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load event data. Please check your connection.');
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Set up live updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchData, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Browser notifications (optional)
  useEffect(() => {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Send notification when next session is 5 minutes away
    if (nextSession && Notification.permission === 'granted') {
      const checkTime = () => {
        const now = new Date();
        const sessionStart = new Date(nextSession.startDateTime);
        const timeDiff = sessionStart - now;
        const minutesUntil = Math.floor(timeDiff / (1000 * 60));
        
        if (minutesUntil === 5) {
          new Notification('Event Update', {
            body: `${nextSession.title} starts in 5 minutes!`,
            icon: '/favicon.ico'
          });
        }
      };
      
      const notificationInterval = setInterval(checkTime, 60000); // Check every minute
      return () => clearInterval(notificationInterval);
    }
  }, [nextSession]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading event data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header />
        
        {/* Session Information */}
        <div className="max-w-4xl mx-auto space-y-6">
          <CurrentSession session={currentSession} />
          <NextSession session={nextSession} />
          
          {/* Attendee Lists */}
          <AttendeeList 
            checkedIn={attendees.checkedIn} 
            awaiting={attendees.awaiting} 
          />
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-12 pb-8">
          <p className="text-gray-400 text-sm">
            Auto-refreshing every 30 seconds • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
