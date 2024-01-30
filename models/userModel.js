const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "PLease add username"]
    },
    email: {
        type: String,
        required: [true, "PLease add the User email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the Strong password"]
    }
}, {
    timestamps: true,
}
);


module.exports = mongoose.model("User", userSchema);