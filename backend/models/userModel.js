const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
