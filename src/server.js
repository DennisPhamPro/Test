import express from "express";
import web from "./route/web";
import configViewEngine from "./config/viewEngine";

require("dotenv").config();

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
const port = process.env.PORT || 8080;

configViewEngine(app);
web.initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
