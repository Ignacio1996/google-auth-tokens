import { getToken } from "./tokens";

export const getMyGoogleCalendarsList = async () => {
  try {
    const token = await getToken();
    console.log(
      "googleCalendar.js 49 | getting calendar events with token",
      token
    );
    const request = await fetch(
      `https://www.googleapis.com/calendar/v3/users/me/calendarList`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await request.json();
    console.log("googleCalendar.js 24 | got calendar events", data);
    return data;
  } catch (error) {
    console.log("googleCalendar.js 35 | error getting calendar data", error);
    return error.message;
  }
};
