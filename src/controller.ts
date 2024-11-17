import * as bcrypt from "bcryptjs";
import { Router } from "express";

import { User } from "./model";

export const authRouter = Router();
export const userRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    const token = createToken(existingUser.id);

    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
});

authRouter.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ fullName, email, password: hashedPassword });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).json({ message: error.message });
  }
});
