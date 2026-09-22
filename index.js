import express from "express";
import { register,login } from "./controllers/authController.js";

const app = express();
const port = 3000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// Validation middleware
const validInfo = (req, res, next) => {
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).send("Input field missing");
  }

  // Check email
  if (
    !email.includes("@") ||
    !email.includes(".") ||
    email.length < 4
  ) {
    return res.status(400).send("Invalid email");
  }

  // Check password
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  if (password.length < 8 || !hasNumber || !hasSymbol) {
    return res.status(400).send(
      "Weak password: password must be at least 8 characters and contain a number and symbol"
    );
  }

  // Attach validated data to the request
  const data = {
    name,
    email,
    password,
  };

  req.validData = data;

  next();
};

// Register
app.post("/register", validInfo,register);

// Login
   
 //validLoginInfo
const validLoginInfo=(req,res,next)=>{
     
    //checks if the inputs are valid,like 
    //if inputs are inserted

    const {email,password}=req.body;

    if(!email||!password){
         return res.send('please fill the input filleds')
    }

    req.loginData = {
    email,
    password,
      };

    next()
}

app.post("/login", validLoginInfo, login);

// Logout
app.post("/logout", (req, res) => {
  try {
    res.send("User logged out");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

// Update profile
app.patch("/updateProfile", (req, res) => {
  try {
    res.send("Profile update endpoint");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

// Change password
app.patch("/changeProfile", (req, res) => {
  try {
    res.send("Change password endpoint");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

// Reset password
app.put("/resetPassword", (req, res) => {
  try {
    res.send("Reset password endpoint");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

// Delete account
app.delete("/deleteAccount", (req, res) => {
  try {
    res.send("Delete account endpoint");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Port started at ${port}`);
});