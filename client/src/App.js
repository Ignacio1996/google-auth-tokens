import React, { useState, useEffect } from "react";
import { getMyGoogleCalendarsList } from "./calendarApi";
import { setTokens } from "./tokens";

function App() {
  useEffect(() => {
    handleTokenFromQueryParams();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const createGoogleAuthLink = async () => {
    try {
      const request = await fetch("http://localhost:8080/createAuthLink", {
        method: "POST",
      });
      const response = await request.json();
      window.location.href = response.url;
    } catch (error) {
      console.log("App.js 12 | error", error);
      throw new Error("Issue with Login", error.message);
    }
  };

  const handleTokenFromQueryParams = () => {
    // get url params
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get("accessToken");
    const refreshToken = query.get("refreshToken");
    const expirationDate = newExpirationDate();
    console.log("App.js 30 | expiration Date", expirationDate);
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken, expirationDate);
      setIsLoggedIn(true);
    }
  };

  const newExpirationDate = () => {
    var expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    return expiration;
  };

  const setTokens = async (token, refreshToken, expirationDate) => {
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("expirationDate", expirationDate);
  };

  const signOut = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  };

  return (
    <div className="App">
      <h1>Google</h1>
      {!isLoggedIn ? (
        <button onClick={createGoogleAuthLink}>Login</button>
      ) : (
        <>
          <button onClick={getMyGoogleCalendarsList}>
            Get Google Calendars
          </button>
          <button onClick={signOut}>Sign Out</button>
        </>
      )}
    </div>
  );
}

export default App;
