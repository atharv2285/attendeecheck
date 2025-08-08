# Event Live Status Page

A responsive, real-time event status page that displays current sessions, upcoming sessions, and attendee check-in status with sample data.

## Features

- 🎯 **Real-time Updates**: Auto-refreshes every 30 seconds
- 📱 **Mobile-First Design**: Responsive layout optimized for phones
- 🎨 **Modern UI**: Beautiful gradient design with glassmorphism effects
- 📊 **Live Session Tracking**: Shows current and next sessions with countdowns
- 👥 **Attendee Lists**: Separate sections for checked-in and awaiting attendees
- 🔔 **Browser Notifications**: Optional notifications for upcoming sessions
- 📈 **Sample Data**: Pre-configured with realistic event data

## Quick Start

1. **Clone and Install**
   ```bash
   cd event-live-status
   npm install
   ```

2. **Run the App**
   ```bash
   npm run dev
   ```

3. **Deploy**
   ```bash
   npm run build
   ```
   Deploy the `dist` folder to Vercel, Netlify, or your preferred hosting service.

## Sample Data

The app comes with pre-configured sample data:

### Attendees
- **Alice Johnson** - Checked-In (Speaker)
- **Bob Smith** - Awaiting (Attendee)
- **Carla Williams** - Checked-In (Organizer)
- **David Lee** - Awaiting (Attendee)
- **Emma Davis** - Checked-In (Speaker)
- **Frank Miller** - Checked-In (Attendee)
- **Grace Wilson** - Awaiting (Attendee)
- **Henry Brown** - Checked-In (Speaker)

### Schedule
- **08:30-09:00** - Registration & Welcome Coffee
- **09:00-10:00** - Opening Keynote: Future of Technology (Alice Johnson)
- **10:00-10:15** - Morning Break
- **10:15-11:30** - Technical Workshop: AI Implementation (Bob Smith)
- **11:30-12:30** - Panel Discussion: Industry Trends (Carla Williams, Emma Davis)
- **12:30-13:30** - Lunch Break
- **13:30-14:45** - Afternoon Session: Innovation Lab (Henry Brown)
- **14:45-15:30** - Closing Remarks & Networking

## Customization

### Event Details
Update the event name and date in the Header component:
```jsx
<Header eventName="Your Event Name" eventDate="2024-12-15" />
```

### Sample Data
Modify the sample data in `src/utils/fetchSheetData.js`:
- `SAMPLE_ATTENDEES` - Update attendee information
- `SAMPLE_SCHEDULE` - Update event schedule

### Styling
The app uses Tailwind CSS with custom components. You can modify:
- Colors in `src/index.css`
- Layout in individual components
- Background gradients in the main App component

### Update Frequency
Change the refresh interval in `App.jsx`:
```jsx
const interval = setInterval(fetchData, 30000); // 30 seconds
```

## Browser Notifications

The app can send browser notifications when:
- Next session is 5 minutes away
- Current session starts

Users will be prompted to allow notifications on first visit.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Date/Time**: dayjs
- **Data**: Sample data (no external dependencies)
- **Deployment**: Vercel/Netlify ready

## Troubleshooting

### Styling Issues
1. Ensure Tailwind CSS is properly configured
2. Check that `src/index.css` contains the Tailwind directives
3. Verify the `tailwind.config.js` includes the correct content paths

### Build Issues
1. Make sure all dependencies are installed: `npm install`
2. Check Node.js version compatibility
3. Clear node_modules and reinstall if needed

## License

MIT License - feel free to use this project for your events!
