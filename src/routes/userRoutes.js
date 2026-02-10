import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "All Users!" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Specific User!" });
});

router.put("/", (req, res) => {
  res.status(200).json({ message: "User updated successfully" });
});

export default router;
