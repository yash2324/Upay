const express = require("express");
const app = express();
const rootRouter = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("Server started");
});

app.use("/api/v1", rootRouter);
