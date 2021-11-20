// express server
const express = require("express");
const app = express();

// initialize express server
app.listen(process.env.PORT || 8080, () => {
  console.log("listening on port 8080");
});
