export const getToken = async () => {
  if (tokenExpired()) {
    console.log("tokens.js 3 | token expired");
    const refreshtoken = sessionStorage.getItem("refreshToken");
    // get new token from server with refresh token
    const token = await getValidTokenFromServer(refreshtoken);
    console.log("tokens.js 6 | token", token);
    // save token to local storage and add new expiration date
    sessionStorage.setItem("accessToken", token.accessToken);
    sessionStorage.setItem("expirationDate", newExpirationDate());
    return token.accessToken;
  } else {
    console.log("tokens.js 11 | token not expired");
    return sessionStorage.getItem("accessToken");
  }
};

const newExpirationDate = () => {
  var expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  return expiration;
};

const tokenExpired = () => {
  const now = Date.now();

  const expirationDate = sessionStorage.getItem("expirationDate");
  const expDate = new Date(expirationDate);

  console.log("tokens.js 26 | now vs expiration date", now, expDate.getTime());

  if (now > expDate.getTime()) {
    console.log("tokens.js 16 | token expired");
    return true;
  }
  console.log("tokens.js 19 | token valid");
  return false;
};

const getValidTokenFromServer = async (refreshToken) => {
  // get new token from server
  console.log("tokens.js 32 | getting a valid token", refreshToken);
  try {
    const request = await fetch("http://localhost:8080/getValidToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });
    const token = await request.json();
    return token;
  } catch (error) {
    throw new Error("Issue getting new token", error.message);
  }
};
