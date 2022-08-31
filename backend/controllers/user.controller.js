const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json({ users });
}

module.exports.getOneUsers = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) 
        return res.status(400).send( "ID inconnu : " + req.params.id );

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log( "ID inconnu : " + err );
    }).select("-password");
};