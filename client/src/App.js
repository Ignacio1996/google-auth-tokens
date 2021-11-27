import React, { useState, useEffect } from "react";
import { getMyGoogleCalendarsList } from "./calendarApi";
import { setTokens } from "./tokens";

function App() {
  useEffect(() => {
    handleTokenFromQueryParams();
  }, []);

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
    const expirationDate = query.get("expirationDate");
    if (accessToken && refreshToken && expirationDate) {
      // save tokens on local storage
      console.log("App.js 30 | expiration date", Date(expirationDate));
      setTokens(accessToken, refreshToken, expirationDate);
      // cleans up url after getting tokens
      // window.location.href = "/";
    }
  };

  const setTokens = async (token, refreshToken, expirationDate) => {
    console.log("tokens.js | setting tokens", expirationDate);
    sessionStorage.setItem("accessToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    sessionStorage.setItem("expirationDate", expirationDate);
  };

  return (
    <div className="App">
      <h1>Google</h1>
      <button onClick={createGoogleAuthLink}>Login</button>
      <button onClick={getMyGoogleCalendarsList}>Get Google Calendars</button>
    </div>
  );
}

export default App;
