const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("Server started");
});
connect(process.env.MONGOURL).then(console.log("db connected successfuly"));
app.use("/api/v1", rootRouter);
