const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otp: String,
        otpExpiry: Date,
    },
    { timestamps: true },
    { versionKey: false }
);


userSchema.pre("save", async function () {
    if (!this.isModified('password')) {
        return ;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
   
});

const User = mongoose.model("User", userSchema);

module.exports = User