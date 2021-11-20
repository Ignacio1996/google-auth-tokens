//usestate
import React, { useState } from "react";

function App() {
  const createGoogleAuthLink = async () => {
    try {
      const request = await fetch("localhost:8080/createAuthLink");
      const response = await request.json();
      window.location.href = response.url;
    } catch (error) {
      throw new Error("Issue with Login", error.message);
    }
  };

  return (
    <div className="App">
      <h1>Google</h1>
      <button onClick={createGoogleAuthLink}>Login</button>
    </div>
  );
}

export default App;
