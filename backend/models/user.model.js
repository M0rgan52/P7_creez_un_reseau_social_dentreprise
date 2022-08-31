const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
    prenom: { type: String },
    nom: { type: String },
    fonction: { type: String },
    email: { type: String, require: true, unique: true, trim: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"], lowercase: true },
    password: { type: String, require: true, maxLength: 1000, minLength: 6 },
    picture: { type: String, default: "./images/user-default.png" },
    likes: { type: [String] }
},
    {
    timestamps: true,
});

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);