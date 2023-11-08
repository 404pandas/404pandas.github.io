const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");

// Initialize  app and create port
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static
app.use(express.static("public"));
// middleware
app.use("/", htmlRoutes);

// Start the server on the port
app.listen(PORT, () =>
  console.log(`Listening on PORT: http://127.0.0.1:${PORT}`)
);
