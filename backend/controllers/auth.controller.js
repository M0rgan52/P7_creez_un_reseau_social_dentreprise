const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const expires = 24 * 60 * 60 * 1000 

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: expires
    })
};

module.exports.signUp = async (req, res) => {
    const {email, password} = req.body 

    try {
        const user = await UserModel.create({email, password});
        res.status(201).json({ user: user._id });
    }
    catch(error) {
        res.status(400).send({ error });
    }
};

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: expires });
        res.status(200).json({ user: user._id })
    }
    catch (error) {
        res.status(400).json({ error });

    }

};

module.exports.logout = async (req, res) => {

};