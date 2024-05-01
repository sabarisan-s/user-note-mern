const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

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

app.use("/", require("./routers/userRouter"));
app.use("/", require("./routers/notesRouter"));


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
