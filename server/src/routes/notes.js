import express from "express";
import Note from "../models/Notes.js";

const router = express.Router();

// GET all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new note
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newNote = await Note.create({ title, description });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
