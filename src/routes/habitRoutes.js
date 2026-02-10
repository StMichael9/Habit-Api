import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Habit!" });
});

router.get("/:id,", (req, res) => {
  res.status(200).json({ message: "Habit added" });
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "Habit created successfully" });
});

router.delete("/id", (req, res) => {
  res.status(200).json({ message: "Habit deleted successfully" });
});

router.post("/:id/complete", (req, res) => {});

export default router;
