import pool from "../config/connectDB";

const getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");

  return res.render("index.ejs", { Userdata: rows });
  // return res.send({ status: 200, data: rows });
};

const getDetailpage = async (req, res) => {
  const id = req.params.userID;
  const [userDetail, fields] = await pool.execute(
    `SELECT * FROM user WHERE Id = ${id}`
  );

  return res.send(JSON.stringify(userDetail));
};

const createNewuser = async (req, res) => {
  console.log("check req body: ", req.body);
  const { FirstName, LastName, Email, Address } = req.body;

  await pool.execute(
    `INSERT INTO user (FirstName, LastName, Email, Address) VALUES (?, ?, ?, ?)`,
    [FirstName, LastName, Email, Address]
  );
  return res.redirect("/");
};

const deleteUser = async (req, res) => {
  const userID = req.body.userID;

  await pool.execute(`DELETE FROM user WHERE Id=${userID}`);
  return res.redirect("/");
};

const getEditPage = async (req, res) => {
  const userID = req.params.userID;

  const [user] = await pool.execute(`SELECT * FROM user WHERE Id=${userID}`);

  return res.render("update_user.ejs", { Userdata: user });
};

const updateUser = async (req, res) => {
  const { FirstName, LastName, Email, Address, userID } = req.body;

  await pool.execute(
    `UPDATE user SET FirstName= ?, LastName= ?, Email= ?, Address= ? WHERE Id= ?`,
    [FirstName, LastName, Email, Address, userID]
  );

  return res.redirect("/");
};

const getUploadFilePage = (req, res) => {
  return res.render("uploadFile.ejs");
};

const handleUploadFile = (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  // req.file contains information of uploaded file
  // req.body contains information of text fields, if there were any

  // if (req.fileValidationError) {
  //   return res.send(req.fileValidationError);
  // } else if (!req.file) {
  //   return res.send("Please select an image to upload");
  // }

  // Display uploaded image for user validation
  return res.render("uploadSuccess.ejs", {
    imageInfo: [req.file],
  });
};

const handleUploadMultiFiles = (req, res) => {
  // 'multiple_images' is the name of our file input field in the HTML form
  // req.files contains information of all uploaded files
  // req.body contains information of text fields, if there were any

  // if (req.fileValidationError) {
  //   return res.send(req.fileValidationError);
  // } else if (!req.files) {
  //   return res.send("Please select an image to upload");
  // }
  // Display uploaded image for user validation
  return res.render("uploadSuccess.ejs", {
    imageInfo: req.files,
  });
};

module.exports = {
  getHomepage,
  getDetailpage,
  createNewuser,
  deleteUser,
  getEditPage,
  updateUser,
  getUploadFilePage,
  handleUploadFile,
  handleUploadMultiFiles,
};
