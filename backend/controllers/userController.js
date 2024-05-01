const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createAccount = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

const getUser = async (req, res) => {
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
};

module.exports = {
    createAccount,
    login,
    getUser,
};
