import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Ensure passwords have a minimum length
        },
        savedRecipes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Recipe",
            },
        ],
    },
    { timestamps: true }
);

// 🔹 Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔹 Compare entered password with stored hashed password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Generate JWT access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id, // Use `_id` (not `this.id`)
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" } // Default expiry if not set
    );
};

export const User = mongoose.model("User", userSchema);
