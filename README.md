# Event Live Status Page

A responsive, real-time event status page that displays current sessions, upcoming sessions, and attendee check-in status from Google Sheets.

## Features

- 🎯 **Real-time Updates**: Auto-refreshes every 30 seconds
- 📱 **Mobile-First Design**: Responsive layout optimized for phones
- 🎨 **Modern UI**: Beautiful gradient design with glassmorphism effects
- 📊 **Live Session Tracking**: Shows current and next sessions with countdowns
- 👥 **Attendee Lists**: Separate sections for checked-in and awaiting attendees
- 🔔 **Browser Notifications**: Optional notifications for upcoming sessions
- 📈 **Google Sheets Integration**: Pulls data directly from published Google Sheets

## Quick Start

1. **Clone and Install**
   ```bash
   cd event-live-status
   npm install
   ```

2. **Configure Google Sheets**
   - Create a Google Sheet with two tabs: "Attendees" and "Schedule"
   - Set up the required columns (see Google Sheets Setup below)
   - Publish to web and get the CSV URLs

3. **Update Sheet URLs**
   - Open `src/utils/fetchSheetData.js`
   - Replace `YOUR_SHEET_ID` with your actual Google Sheet ID
   - Update the URLs for both attendees and schedule tabs

4. **Run the App**
   ```bash
   npm run dev
   ```

5. **Deploy**
   ```bash
   npm run build
   ```
   Deploy the `dist` folder to Vercel, Netlify, or your preferred hosting service.

## Google Sheets Setup

### Attendees Tab
Create a tab named "Attendees" with these columns:
- **Name** (required): Attendee's full name
- **Status** (required): "Checked-In" or any other status
- **Role** (optional): Attendee's role (e.g., "Speaker", "Organizer")
- **Photo URL** (optional): URL to attendee's photo

### Schedule Tab
Create a tab named "Schedule" with these columns:
- **Session Title** (required): Name of the session
- **Speaker** (required): Speaker's name
- **Start Time** (required): Time in HH:MM format (e.g., "09:00")
- **End Time** (required): Time in HH:MM format (e.g., "10:30")

### Publishing to Web
1. Open your Google Sheet
2. Go to **File > Share > Publish to web**
3. Choose the specific tab and format (CSV)
4. Copy the generated URL
5. Replace the URLs in `src/utils/fetchSheetData.js`

## Customization

### Event Details
Update the event name and date in the Header component:
```jsx
<Header eventName="Your Event Name" eventDate="2024-12-15" />
```

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
- **Data**: Google Sheets CSV API
- **Deployment**: Vercel/Netlify ready

## Troubleshooting

### CORS Issues
If you encounter CORS errors:
1. Ensure your Google Sheet is published to web
2. Use the CSV format URL
3. Check that the sheet is publicly accessible

### Data Not Loading
1. Verify your Google Sheet URLs are correct
2. Check that your sheet has the required columns
3. Ensure the sheet is published to web
4. Check browser console for error messages

### Styling Issues
1. Ensure Tailwind CSS is properly configured
2. Check that `src/index.css` contains the Tailwind directives
3. Verify the `tailwind.config.js` includes the correct content paths

## License

MIT License - feel free to use this project for your events!
