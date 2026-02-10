import express from "express";
import bycrypt from "bcryptjs";
import { db } from "../db/connection.js";
import { users } from "../db/schema.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePasswords } from "../utils/passwords.js";
import { eq } from "drizzle-orm";

export const register = async (req, res) => {
  try {
    const { email, password, username, firstname, lastname } = req.body;

    const hashedPassword = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        email: email,
        password: hashedPassword,
        username: username,
        firstName: firstname,
        lastName: lastname,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        firstname: users.firstname,
        lastname: users.lastname,
      });

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    });

    res.status(201).json({
      message: "User created",
      user,
      token,
    });
  } catch (e) {
    console.error("Error while registering user:", e);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email), // eq is means equal literally. So here were are just saying that the users email that is in the database equals the email they are entering.
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" }); // In an app this is where you would redirect to the signup page
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
      token,
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Login failed" });
  }
};
