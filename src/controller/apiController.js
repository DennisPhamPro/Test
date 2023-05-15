import pool from "../config/connectDB";

const getAllUsers = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM user");

  return res.status(200).json({ message: "success", data: rows });
};

const createNewUser = async (req, res) => {
  const { FirstName, LastName, Email, Address } = req.body;

  if (!FirstName || !LastName || !Email || !Address) {
    return res.status(400).json({ message: "Missing required params." });
  }

  try {
    await pool.execute(
      `INSERT INTO user (FirstName, LastName, Email, Address) VALUES (?, ?, ?, ?)`,
      [FirstName, LastName, Email, Address]
    );
  } catch (err) {
    console.log("Error occured: ", err);
    return res.status(400).json(err);
  }

  return res.status(200).json({
    message: "success",
  });
};

const updateUser = async (req, res) => {
  const { Id, FirstName, LastName, Email, Address } = req.body;
  if (!Id) {
    return res.status(400).json({ message: "Missing user ID param." });
  }

  let userData;

  try {
    const [Data] = await pool.execute(`SELECT * FROM user WHERE Id=${Id}`);
    userData = Data[0];
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "User not found." });
  }

  const editedFirstName = FirstName || userData.FirstName;
  const editedLastName = LastName || userData.LastName;
  const editedEmail = Email || userData.Email;
  const editedAddress = Address || userData.Address;

  try {
    await pool.execute(
      `UPDATE user SET FirstName= ?, LastName= ?, Email= ?, Address= ? WHERE Id= ?`,
      [editedFirstName, editedLastName, editedEmail, editedAddress, Id]
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server went down." });
  }

  return res.status(200).json({ message: "success" });
};

const deleteUser = async (req, res) => {
  const userID = req.body.Id;

  if (!userID) {
    return res.status(400).json({ message: "Missing user ID param." });
  }

  try {
    await pool.execute(`DELETE FROM user WHERE Id=${userID}`);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server went down." });
  }

  return res.status(200).json({ message: "success" });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
