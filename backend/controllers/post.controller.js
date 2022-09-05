const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Erreur de connexion : " + err);
    })
};

module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    const updatedRecord = {
        message: req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log(" Erreur mise à jour : " + err);
        }
    )

};

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    PostModel.findByIdAndDelete(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log(" Erreur suppression : " + err);
        }
    )
};

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { likers: req.body.id }, },
            { new: true }
        )
            .then((docs) => res.send(docs))
            .catch((error) => res.status(500).send(error));
        await UserModel.findByIdAndUpdate(
            req.body.id,
            { $addToSet: { likes: req.params.id }, },
            { new: true },
        )
            .then((docs) => res.send(docs))
            .catch((error) => res.status(500).send(error));
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.dislikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            { $pull: { likers: req.body.id }, },
            { new: true }
        )
            .then((docs) => res.send(docs))
            .catch((error) => res.status(500).send(error));
        await UserModel.findByIdAndUpdate(
            req.body.id,
            { $pull: { likes: req.params.id }, },
            { new: true },
        )
            .then((docs) => res.send(docs))
            .catch((error) => res.status(500).send(error));
    } catch (err) {
        return res.status(400).send(err);
    }

};

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterEmail: req.body.commenterEmail,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    }
                }
            },
            { new: true },
        )
            .then((docs) => res.send(docs))
            .catch((error) => res.status(400).send(error));
    } catch (err) {
        return res.status(400).send(err);
    }

};

module.exports.editCommentPost = (req, res) => {

};

module.exports.deleteCommentPost = (req, res) => {

};