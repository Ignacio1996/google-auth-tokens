export const getToken = async () => {
  if (tokenExpired()) {
    console.log("tokens.js 3 | token expired");
    const refreshtoken = sessionStorage.getItem("refreshToken");
    // get new token from server with refresh token
    const token = await getValidTokenFromServer(refreshtoken);
    // save token to local storage and add new expiration date
    sessionStorage.setItem("accessToken", token.accessToken);
    sessionStorage.setItem("expirationDate", token.expirationDate);
  } else {
    console.log("tokens.js 11 | token not expired");
    return sessionStorage.getItem("accessToken");
  }
};

const tokenExpired = () => {
  const expirationDate = sessionStorage.getItem("expirationDate");

  const now = new Date();
  console.log(
    "tokens.js 17 | expiration date",
    Date(expirationDate),
    "now",
    now
  );

  if (now >= expirationDate) {
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
