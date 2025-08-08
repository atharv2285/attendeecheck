import dayjs from 'dayjs';

// Google Sheet URLs for the Event Live Status Page
// Sheet ID: 1-PdeB6Kus2WlX9W0tEAGHqtwnYqiwUomDA4ep3shBos

const ATTENDEES_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1-PdeB6Kus2WlX9W0tEAGHqtwnYqiwUomDA4ep3shBos/pub?output=csv&gid=0';
const SCHEDULE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1-PdeB6Kus2WlX9W0tEAGHqtwnYqiwUomDA4ep3shBos/pub?output=csv&gid=1';

// Parse CSV data
const parseCSV = (csvText) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
  }
  
  return data;
};

// Fetch attendees data
export const fetchAttendees = async () => {
  try {
    const response = await fetch(ATTENDEES_SHEET_URL);
    const csvText = await response.text();
    const attendees = parseCSV(csvText);
    
    // Split into checked-in and awaiting
    const checkedIn = attendees.filter(attendee => 
      attendee.Status?.toLowerCase() === 'checked-in'
    );
    const awaiting = attendees.filter(attendee => 
      attendee.Status?.toLowerCase() !== 'checked-in'
    );
    
    return { checkedIn, awaiting };
  } catch (error) {
    console.error('Error fetching attendees:', error);
    return { checkedIn: [], awaiting: [] };
  }
};

// Fetch schedule data
export const fetchSchedule = async () => {
  try {
    const response = await fetch(SCHEDULE_SHEET_URL);
    const csvText = await response.text();
    const schedule = parseCSV(csvText);
    
    // Parse and format schedule data
    const formattedSchedule = schedule.map(session => ({
      title: session['Session Title'] || session.Title || '',
      speaker: session.Speaker || '',
      startTime: session['Start Time'] || session.StartTime || '',
      endTime: session['End Time'] || session.EndTime || '',
      // Convert time strings to dayjs objects for today
      startDateTime: dayjs().format('YYYY-MM-DD') + ' ' + (session['Start Time'] || session.StartTime || ''),
      endDateTime: dayjs().format('YYYY-MM-DD') + ' ' + (session['End Time'] || session.EndTime || '')
    }));
    
    return formattedSchedule;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    // Return sample schedule if the tab doesn't exist yet
    return [
      {
        title: 'Opening Keynote',
        speaker: 'Alice Johnson',
        startTime: '09:00',
        endTime: '10:00',
        startDateTime: dayjs().format('YYYY-MM-DD') + ' 09:00',
        endDateTime: dayjs().format('YYYY-MM-DD') + ' 10:00'
      },
      {
        title: 'Technical Workshop',
        speaker: 'Bob Smith',
        startTime: '10:15',
        endTime: '11:30',
        startDateTime: dayjs().format('YYYY-MM-DD') + ' 10:15',
        endDateTime: dayjs().format('YYYY-MM-DD') + ' 11:30'
      },
      {
        title: 'Panel Discussion',
        speaker: 'Carla Williams',
        startTime: '12:30',
        endTime: '13:30',
        startDateTime: dayjs().format('YYYY-MM-DD') + ' 12:30',
        endDateTime: dayjs().format('YYYY-MM-DD') + ' 13:30'
      }
    ];
  }
};

// Get current session based on time
export const getCurrentSession = (schedule) => {
  const now = dayjs();
  
  return schedule.find(session => {
    const start = dayjs(session.startDateTime);
    const end = dayjs(session.endDateTime);
    return now.isAfter(start) && now.isBefore(end);
  });
};

// Get next session
export const getNextSession = (schedule) => {
  const now = dayjs();
  
  return schedule.find(session => {
    const start = dayjs(session.startDateTime);
    return now.isBefore(start);
  });
};

// Calculate time difference
export const getTimeDifference = (targetTime) => {
  const now = dayjs();
  const target = dayjs(targetTime);
  const diff = target.diff(now, 'minute');
  
  if (diff < 0) {
    return { minutes: Math.abs(diff), isPast: true };
  }
  
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  
  return { hours, minutes, isPast: false };
};

// Format time difference for display
export const formatTimeDifference = (timeDiff) => {
  if (timeDiff.isPast) {
    return `${timeDiff.minutes}m ago`;
  }
  
  if (timeDiff.hours > 0) {
    return `${timeDiff.hours}h ${timeDiff.minutes}m`;
  }
  
  return `${timeDiff.minutes}m`;
}; 