import { title } from "process";
import { createUser, findUserByEmail, checkPassword } from "../models/userModel.js";
import { showPostPage } from "../controllers/postController.js";


// Show register user page
export const showRegisterUserPage = async (req, res) => {
  try {
    res.render("auth/register",{
      layout: "layout",
      title: "Register",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
// Register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation example
    if (!username || !email || !password) {
      return res.status(400).send("All fields are required.");
    }

    await createUser(username, email, password);

    res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Server Error");
  }
};
// Show login user page
export const showLoginUserPage = (req, res) => {
  try {
    res.render("auth/login",{
      layout: "layout",
      title: "Login",
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("All fields required.");

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).send("Invalid email or password.");

    const validPassword = await checkPassword(password, user.password);
    if (!validPassword) return res.status(401).send("Invalid email or password.");

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    showPostPage(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// Show login user page
export const showLayout = (req, res) => {
  try {
    res.render("auth/login");
    // res.render("auth/auth", { users });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Logout user
export const logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.redirect("/login");
  });
};

// export const showAddUserPage = async (req, res) => {
//   try {
//     const users = await getAllUsers();
//     res.render("auth/register", { users });
//     // res.render("auth/auth", { users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };
