const UserModel = require("../models/user.model");

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