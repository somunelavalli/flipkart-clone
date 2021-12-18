require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3500;

app.use(express.json());

//DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

//Routes

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/auth/", require("./routes/admin/auth"));
app.use("/api/category/", require("./routes/category"));
app.use("/api/product/", require("./routes/product"));

app.listen(port, () => {
  console.log("Server is running on Port " + port);
});
