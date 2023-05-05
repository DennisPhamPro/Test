import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  // router.get("/get_data", homeController.getHomepage);
  router.get("/detail/user/:userID", homeController.getDetailpage);
  router.post("/create-user", homeController.createNewuser);

  return app.use("/", router);
  // return app.use("/api/v1", router);
};

module.exports = {
  initWebRoute,
};
