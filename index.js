const express = require("express");
const app = express();

const bookRoutes = require("./routes/books");
const homeRoute = require("./routes/home");

const port = 2000;

//Parsing the request of the body
app.use(express.json());
app.use("/", homeRoute);
app.use("/books", bookRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


