import dayjs from 'dayjs';

// Sample data for the Event Live Status Page
const SAMPLE_ATTENDEES = [
  {
    Name: 'Alice Johnson',
    Status: 'Checked-In',
    Role: 'Speaker',
    PhotoURL: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    Name: 'Bob Smith',
    Status: 'Awaiting',
    Role: 'Attendee',
    PhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    Name: 'Carla Williams',
    Status: 'Checked-In',
    Role: 'Organizer',
    PhotoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    Name: 'David Lee',
    Status: 'Awaiting',
    Role: 'Attendee',
    PhotoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    Name: 'Emma Davis',
    Status: 'Checked-In',
    Role: 'Speaker',
    PhotoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
  {
    Name: 'Frank Miller',
    Status: 'Checked-In',
    Role: 'Attendee',
    PhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
  },
  {
    Name: 'Grace Wilson',
    Status: 'Awaiting',
    Role: 'Attendee',
    PhotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
  },
  {
    Name: 'Henry Brown',
    Status: 'Checked-In',
    Role: 'Speaker',
    PhotoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  }
];

const SAMPLE_SCHEDULE = [
  {
    title: 'Registration & Welcome Coffee',
    speaker: 'Event Team',
    startTime: '08:30',
    endTime: '09:00',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 08:30',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 09:00'
  },
  {
    title: 'Opening Keynote: Future of Technology',
    speaker: 'Alice Johnson',
    startTime: '09:00',
    endTime: '10:00',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 09:00',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 10:00'
  },
  {
    title: 'Morning Break',
    speaker: '-',
    startTime: '10:00',
    endTime: '10:15',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 10:00',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 10:15'
  },
  {
    title: 'Technical Workshop: AI Implementation',
    speaker: 'Bob Smith',
    startTime: '10:15',
    endTime: '11:30',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 10:15',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 11:30'
  },
  {
    title: 'Panel Discussion: Industry Trends',
    speaker: 'Carla Williams, Emma Davis',
    startTime: '11:30',
    endTime: '12:30',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 11:30',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 12:30'
  },
  {
    title: 'Lunch Break',
    speaker: '-',
    startTime: '12:30',
    endTime: '13:30',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 12:30',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 13:30'
  },
  {
    title: 'Afternoon Session: Innovation Lab',
    speaker: 'Henry Brown',
    startTime: '13:30',
    endTime: '14:45',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 13:30',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 14:45'
  },
  {
    title: 'Closing Remarks & Networking',
    speaker: 'Event Team',
    startTime: '14:45',
    endTime: '15:30',
    startDateTime: dayjs().format('YYYY-MM-DD') + ' 14:45',
    endDateTime: dayjs().format('YYYY-MM-DD') + ' 15:30'
  }
];

// Fetch attendees data (now returns sample data)
export const fetchAttendees = async () => {
  try {
    // Split into checked-in and awaiting
    const checkedIn = SAMPLE_ATTENDEES.filter(attendee => 
      attendee.Status?.toLowerCase() === 'checked-in'
    );
    const awaiting = SAMPLE_ATTENDEES.filter(attendee => 
      attendee.Status?.toLowerCase() !== 'checked-in'
    );
    
    return { checkedIn, awaiting };
  } catch (error) {
    console.error('Error fetching attendees:', error);
    return { checkedIn: [], awaiting: [] };
  }
};

// Fetch schedule data (now returns sample data)
export const fetchSchedule = async () => {
  try {
    return SAMPLE_SCHEDULE;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    return [];
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