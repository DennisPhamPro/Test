import multer from "multer";
import appRootPath from "app-root-path";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRootPath + "/src/public/image/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFiler = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = `Only image files are allowed!`;
    return cb(`Only image files are allowed!`, false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFiler });

export default upload;
