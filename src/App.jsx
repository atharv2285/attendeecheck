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
      <div className="min-h-screen demo-day-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center animate-spin">
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Event Data</h2>
          <p className="text-orange-200">Please wait while we fetch the latest updates...</p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen demo-day-bg flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="session-card p-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Connection Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🔄 Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen demo-day-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Header />
        
        {/* Session Information */}
        <div className="max-w-5xl mx-auto space-y-8">
          <CurrentSession session={currentSession} />
          <NextSession session={nextSession} />
          
          {/* Attendee Lists */}
          <AttendeeList 
            checkedIn={attendees.checkedIn} 
            awaiting={attendees.awaiting} 
          />
        </div>
        
        {/* Footer */}
        <footer className="text-center mt-16 pb-8 fade-in">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <p className="text-orange-400 font-medium">Auto-refreshing every 30 seconds</p>
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
