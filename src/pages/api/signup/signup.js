// src/pages/api/auth/signup.js
import { hash } from "bcryptjs";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ username });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await hash(password, 10);

  await db.collection("users").insertOne({
    username,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User created" });
}
