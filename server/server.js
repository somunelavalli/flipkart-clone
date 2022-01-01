require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 3500;

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use(cors());

//DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

//Routes

app.use("/api/auth/", require("./routes/auth"));
app.use("/api/auth/admin/", require("./routes/admin/auth"));
app.use("/api/category/", require("./routes/category"));
app.use("/api/product/", require("./routes/product"));
app.use("/api/cart/", require("./routes/cart"));
app.use("/api/", require("./routes/admin/initialData"));
app.use("/api/admin/page", require("./routes/admin/page"));
app.use("/api/user/address/", require("./routes/address"));

app.listen(port, () => {
  console.log("Server is running on Port " + port);
});
