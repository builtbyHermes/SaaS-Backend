import { getUsers, saveUsers } from "../data/users.js";
import bcrypt from "bcrypt";

export const updateProfile = (req, res) => {
  try {
    const { name, email } = req.body;

    const users = getUsers();

    // Find the authenticated user
       //this will give us reference to the user object inside the users array
    const user = users.find(
      (user) => user.id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Make sure at least one field is provided
    if (!name && !email) {
      return res.status(400).json({
        message: "No profile information provided",
      });
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update email if provided
    if (email) {
      const emailExists = users.find(
        (existingUser) =>
          existingUser.email === email &&
          existingUser.id !== user.id
      );

      if (emailExists) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      user.email = email;
    }

    saveUsers(users);

    res.status(200).json({
      message: "Profile updated successfully",
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

export const updatePassword=(req,res)=>{

}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Check that both passwords were provided
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    // Find the authenticated user
    const users = getUsers();

    const user = users.find(
      (user) => user.id === req.user.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check the current password
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Current password is incorrect",
      });
    }

    // Validate the new password
    const hasNumber = /\d/.test(newPassword);
    const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);

    if (
      newPassword.length < 8 ||
      !hasNumber ||
      !hasSymbol
    ) {
      return res.status(400).json({
        message:
          "New password must be at least 8 characters and contain a number and symbol",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    // Update the existing user's password
    user.password = hashedPassword;

    // Save the updated users array
    saveUsers(users);

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteAccount = (req, res) => {
  try {
    const users = getUsers();

    // Find the authenticated user's index
    const userIndex = users.findIndex(
      (user) => user.id === req.user.id
    );

    if (userIndex === -1) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Save the updated array
    saveUsers(users);

    res.status(200).json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};