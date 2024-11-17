import express from "express";

import { authRouter, userRouter } from "./controller";
import { sequelize } from "./datasource";

export const app = express();

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectToDatabase();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
