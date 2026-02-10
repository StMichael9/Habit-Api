import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { isTest } from "../env.js"; // add this
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan("dev", {
    skip: () => isTest,
  })
);

app.get("/health", (req, res) => {
  res
    .json({ message: "Hello Citizen!", Quote: "Closed mouths don't get fed" })
    .status(200);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/habit", habitRoutes);

// There is no harm in both named and default export. It doesn't change anything.
export { app };

export default app;
