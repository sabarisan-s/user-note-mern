const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();

const { authenticateToken } = require("./utilities");
const userModel = require("./models/userModel");
const noteModel = require("./models/noteModel");

app.use(express.json());
dotenv.config();
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ data: "Hello" });
});

//post request api auth  /create-account
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full Name is required" });
    }

    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is required" });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^/s@]+$/;

    if (!regexEmail.test(email)) {
        return res
            .status(400)
            .json({ error: true, message: "Enter Email Correct Pattern" });
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required" });
    }

    const isUser = await userModel.findOne({ email });
    if (isUser) {
        return res.json({ error: true, message: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(7);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
    });

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registered Successful",
    });
});

//post request api auth /login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is required" });
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^/s@]+$/;

    if (!regexEmail.test(email)) {
        return res
            .status(400)
            .json({ error: true, message: "Enter Email Correct Pattern" });
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: true, message: "Password is required" });
    }

    const isUser = await userModel.findOne({ email });
    if (!isUser) {
        return res
            .status(404)
            .json({ error: true, message: " User not found " });
    }

    if (isUser.email === email && bcrypt.compare(password, isUser.password)) {
        const user = { user: isUser };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid Credentials",
        });
    }
});

//get request api auth /login
app.get("/get-user", authenticateToken, async (req, res) => {
    const { user } = req.user;

    const isUser = await userModel.findOne({ _id: user._id });
    if (!isUser) {
        return res
            .status(401)
            .json({ error: true, message: " User not found " });
    }

    return res.json({
        error: false,
        user: { ...isUser._doc },
        message: "",
    });
});

//post request api note /add-note
app.post("/add-note", authenticateToken, async (req, res, next) => {
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
});

//put request api note /edit-note
app.put("/edit-note/:noteId", authenticateToken, async (req, res, next) => {
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
});

//get request api note /get-all-notes
app.get("/get-all-notes", authenticateToken, async (req, res, next) => {
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
});

//delete request api note /delete-note
app.delete(
    "/delete-note/:noteId",
    authenticateToken,
    async (req, res, next) => {
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
);

//put request api note /update-note-pinned
app.put(
    "/update-note-pinned/:noteId",
    authenticateToken,
    async (req, res, next) => {
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
);

//get request api note /search-notes
app.get("/search-notes/", authenticateToken, async (req, res, next) => {
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
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("database connected");
    })
    .catch((e) => {
        console.log("database not connected", e.message);
    });

const port = 8000 || process.env.PORT;
app.listen(port, (e) => {
    if (e) throw e.message;
    console.log("server running");
});
