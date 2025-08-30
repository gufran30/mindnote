import Note from "../models/note.model.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); /*Newest first. -1 sort in desc. order */
    res.status(200).json(notes);
  } catch (error) {
    console.error("----- Error in getAllNotes Controller ----->".error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  req.params.id;
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("----- Error in createNote Controller ----->".error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    console.log("--- updatedNote --->", updatedNote);
    if (!updatedNote) return res.status(404).json({ msg: "Note not found." });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("----- Error in updateNote Controller ----->".error);
    if (error.name === "CastError") {
      return res
        .status(404)
        .json({ msg: `Note not found with id of ${req.params.id}` });
    }
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    console.log("--- deletedNote --->", deletedNote);
    if (!deletedNote) return res.status(404).json({ msg: "Note not found." });

    res.status(200).json({ msg: "Note deleted successfully!", deletedNote });
  } catch (error) {
    console.error("----- Error in deleteNote Controller ----->".error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found." });
    res.status(200).json(note);
  } catch (error) {
    console.error("----- Error in getNoteById Controller ----->".error);
    res.status(500).json({ msg: "Internal sperver error" });
  }
};
