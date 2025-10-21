import { getAllUsers } from "../models/userModel.js";

export const showAddUserPage = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.render("auth/auth", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
