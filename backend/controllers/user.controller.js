const userModel = require("../models/user.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json({ users });
}

module.exports.getOneUsers = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("ID inconnu : " + err);
    }).select("-password");
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        await UserModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { prenom: req.body.prenom, nom: req.body.nom, fonction: req.body.fonction }, },
            { new: true, upsert: true, setDefaultsOnInsert: true })
            .then((data) => res.send(data))
            .catch((error) => res.status(500).json({ error }));
    }
    catch (error) {
        return res.status(500).json({ error });
    }

};

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        await userModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Profil supprimé" });
    }
    catch (error) {
        return res.status(500).json({ error });
    }

};