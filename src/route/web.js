import express from "express";
import homeController from "../controller/homeController";
import upload from "../config/multerMiddleware";

const router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  // router.get("/get_data", homeController.getHomepage);
  router.get("/detail/user/:userID", homeController.getDetailpage);
  router.post("/create-user", homeController.createNewuser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-page/:userID", homeController.getEditPage);
  router.post("/update-user", homeController.updateUser);

  router.get("/upload", homeController.getUploadFilePage);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    homeController.handleUploadFile
  );
  router.post(
    "/upload-multiple-images",
    upload.array("multiple_images", 6),
    homeController.handleUploadMultiFiles
  );

  return app.use("/", router);
  // return app.use("/api/v1", router);
};

module.exports = {
  initWebRoute,
};
