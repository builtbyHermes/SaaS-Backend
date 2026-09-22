import { getUsers, saveUsers } from "../data/users.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.validData;
    
    
    const users = getUsers();

    // Check if user already exists
    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {

      return res.status(409).json({
        message: "Email already registered",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password:hashedPassword,
    };

    users.push(newUser);

    // Save updated users to users.json
    saveUsers(users);

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.loginData;

    const users = getUsers();

    const user = users.find(
      (user) => user.email === email
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};