import express from "express";
import apiController from "../controller/apiController";
const router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", apiController.getAllUsers);
  router.post("/create-new-user", apiController.createNewUser);
  router.put("/update-user", apiController.updateUser);
  router.delete("/delete-user", apiController.deleteUser);

  return app.use("/api/v1", router);
};

module.exports = {
  initAPIRoute,
};
