const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    prenom: { type: String },
    nom: { type: String },
    fonction: { type: String },
    email: { type: String, require: true, unique: true, trim: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Veuillez entrer une adresse email correcte"], lowercase: true },
    password: { type: String, require: true, maxLength: 1000, minLength: 6 },
    picture: { type: String },
    likes: { type: [String] }
},
    {
        timestamps: true,
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);