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

module.exports = {
  getHomepage,
  getDetailpage,
  createNewuser,
};
