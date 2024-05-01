
const noteModel = require("../models/noteModel");

const addNote = async (req, res, next) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    console.log(user);

    if (!title) {
        return res
            .status(400)
            .json({ error: true, message: "Title is required" });
    }

    if (!content) {
        return res
            .status(400)
            .json({ error: true, message: "Content is required" });
    }
    try {
        const note = await noteModel.create({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });
        return res
            .status(201)
            .json({ error: false, note, message: "Note Added Successful" });
    } catch (error) {
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
}

const editNote =async (req, res, next) => {
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;
    const { noteId } = req.params;
    console.log(noteId);

    if (!title && !content && !tags) {
        return res
            .status(400)
            .json({ error: true, message: "No Changes Provider" });
    }

    try {
        const note = await noteModel.findOne({ _id: noteId, userId: user._id });

        if (!note) {
            return res
                .status(400)
                .json({ error: true, message: "Note Not found  " });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Updated",
        });
    } catch (error) {
        if (error) {
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }
}

const getAllNotes = async (req, res, next) => {
    console.log(req.user);
    const { user } = req.user;
    try {
        const notes = await noteModel
            .find({ userId: user._id })
            .sort({ isPinned: -1 });

        return res
            .status(200)
            .json({ error: false, notes, message: "All notes Showed" });
    } catch (error) {
        if (error) {
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }
}

const deleteNote =  async (req, res, next) => {
    const { noteId } = req.params;
    const { user } = req.user;

    try {
        const note = await noteModel.findOne({
            _id: noteId,
            userId: user._id,
        });

        if (!note) {
            return res
                .status(404)
                .json({ error: true, message: "Note Not Found" });
        }

        await noteModel.deleteOne({ _id: noteId, userId: user._id });

        return res.status(200).json({
            error: false,
            message: "Note Deleted Successfully",
        });
    } catch (error) {
        if (error) {
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }
}

const updateNotePinned =  async (req, res, next) => {
    const { isPinned } = req.body;
    const { user } = req.user;
    const { noteId } = req.params;

    try {
        const note = await noteModel.findOne({
            _id: noteId,
            userId: user._id,
        });

        if (!note) {
            return res
                .status(400)
                .json({ error: true, message: "Note Not found" });
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note Pinned Updated",
        });
    } catch (error) {
        if (error) {
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }
}

const searchNotes = async (req, res, next) => {
    const { user } = req.user;
    const { query } = req.query;
    if (!query) {
        return res
            .status(400)
            .json({ error: true, message: "Search query is required" });
    }

    try {
        const matchNotes = await noteModel.find({
            userId: user._id,
            $or:[
                {title:{$regex :new RegExp(query,'i')}},
                {content:{$regex :new RegExp(query,'i')}},
            ]
        });

        return res.json({
            error: false,
            notes:matchNotes,
            message: "Note matching search query retrieved successfully",
        });
    } catch (error) {
        if (error) {
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }
}

module.exports={
    addNote,editNote,getAllNotes,updateNotePinned,deleteNote,searchNotes
}