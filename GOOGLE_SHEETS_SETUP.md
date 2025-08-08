# Google Sheets Setup Guide

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Event Live Status Data"

## Step 2: Set Up the Attendees Tab

1. Rename the first tab to "Attendees"
2. Add these headers in row 1:
   ```
   Name | Status | Role | Photo URL
   ```

3. Add sample data:
   ```
   John Doe | Checked-In | Speaker | https://example.com/john.jpg
   Jane Smith | Awaiting | Attendee | 
   Bob Johnson | Checked-In | Organizer | https://example.com/bob.jpg
   Alice Brown | Awaiting | Attendee |
   ```

## Step 3: Set Up the Schedule Tab

1. Create a new tab named "Schedule"
2. Add these headers in row 1:
   ```
   Session Title | Speaker | Start Time | End Time
   ```

3. Add sample data:
   ```
   Opening Keynote | John Doe | 09:00 | 10:00
   Break | - | 10:00 | 10:15
   Technical Workshop | Jane Smith | 10:15 | 11:30
   Lunch Break | - | 11:30 | 12:30
   Panel Discussion | Bob Johnson | 12:30 | 13:30
   Closing Remarks | Alice Brown | 13:30 | 14:00
   ```

## Step 4: Publish to Web

1. Click **File > Share > Publish to web**
2. Choose "Entire document" or specific tabs
3. Select "CSV" as the format
4. Click "Publish"
5. Copy the generated URLs

## Step 5: Get Your Sheet ID

From your Google Sheet URL, extract the Sheet ID:
```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
```

## Step 6: Update the App

1. Open `src/utils/fetchSheetData.js`
2. Replace the URLs with your actual URLs:

```javascript
const ATTENDEES_SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv&gid=0';
const SCHEDULE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv&gid=1';
```

Note: The `gid` parameter refers to the tab index:
- `gid=0` = First tab (Attendees)
- `gid=1` = Second tab (Schedule)

## Sample Data for Testing

### Attendees Tab
```
Name,Status,Role,Photo URL
John Doe,Checked-In,Speaker,https://example.com/john.jpg
Jane Smith,Awaiting,Attendee,
Bob Johnson,Checked-In,Organizer,https://example.com/bob.jpg
Alice Brown,Awaiting,Attendee,
Mike Wilson,Checked-In,Speaker,
Sarah Davis,Awaiting,Attendee,
```

### Schedule Tab
```
Session Title,Speaker,Start Time,End Time
Opening Keynote,John Doe,09:00,10:00
Break,-,10:00,10:15
Technical Workshop,Jane Smith,10:15,11:30
Lunch Break,-,11:30,12:30
Panel Discussion,Bob Johnson,12:30,13:30
Closing Remarks,Alice Brown,13:30,14:00
```

## Important Notes

1. **Time Format**: Use 24-hour format (HH:MM) for times
2. **Status Values**: "Checked-In" (exact match) for checked-in attendees
3. **Photo URLs**: Optional, but must be valid image URLs
4. **Real-time Updates**: Changes in your Google Sheet will appear in the app within 30 seconds
5. **Public Access**: The sheet must be published to web for the app to access it

## Troubleshooting

- **CORS Errors**: Make sure the sheet is published to web
- **No Data Loading**: Check that your URLs are correct and the sheet is public
- **Wrong Tab Data**: Verify the `gid` parameter matches your tab order
- **Time Issues**: Ensure times are in HH:MM format and the event date is today 