const express = require("express");
const studentroute = require("./routes/student.route");
const userroute = require("./routes/user.route");
const cors = require("cors");

const app = express();

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: "*", // Replace with your Angular app's URL
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use((req, res, next) => {
  res.setTimeout(10000, () => { // Set timeout to 10 seconds
    res.status(408).send('Request Timeout');
  });
  next();
});

// Define routes
app.use("/", studentroute);
app.use("/", userroute);

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
