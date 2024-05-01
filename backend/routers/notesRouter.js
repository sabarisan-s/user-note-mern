const express = require("express");
const router = express.Router();
const {
    addNote,
    editNote,
    getAllNotes,
    updateNotePinned,
    deleteNote,
    searchNotes,
} = require("../controllers/noteController");
const { authenticateToken } = require("../utilities");

router.post("/add-note", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.put("/update-note-pinned/:noteId", authenticateToken, updateNotePinned);
router.get("/search-notes/", authenticateToken, searchNotes);

module.exports = router;
