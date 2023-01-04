let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const rs1aRoutes = require("./rs1a/sampleRemote");
const rs1bRoutes = require("./rs1b/sampleRemote1b");
const rs1cRoutes = require("./rs1c/studentServerRemote");
app.use("/productServer/", rs1aRoutes);
app.use("/messageServer/", rs1bRoutes);
app.use("/studentServer/", rs1cRoutes);

const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
