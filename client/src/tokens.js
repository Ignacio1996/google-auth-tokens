export const getToken = async () => {
  if (tokenExpired()) {
    const refreshtoken = sessionStorage.getItem("refreshToken");
    const token = await getValidTokenFromServer(refreshtoken);
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

  if (now > expDate.getTime()) {
    return true; // token expired
  }

  return false; // valid token
};

const getValidTokenFromServer = async (refreshToken) => {
  // get new token from server with refresh token
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
