import express from "express";
import web from "./route/web";
import api from "./route/api";
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
api.initAPIRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
