const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const fs = require("fs");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Erreur de connexion : " + err);
    }).sort({ createdAt: -1 });
};

module.exports.createPost = async (req, res, next) => {

    if (req.file != null) {
        const newPost = new PostModel({
            posterId: req.body.posterId,
            message: req.body.message,
            picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
            likers: [],
            comments: []
        });

        newPost.save()
            .then(() => res.status(201).json({ message: "Post créé" }))
            .catch(error => res.status(400).json({ error }));

    } else {
        const newPost = new PostModel({
            posterId: req.body.posterId,
            message: req.body.message,
            likers: [],
            comments: []
        })

        newPost.save()
            .then(() => res.status(201).json({ message: "Post créé" }))
            .catch(error => res.status(400).json({ error }));
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

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Delete error : " + err);
    });
  };
module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true })
            // .then((data) => res.send(data))
            // .catch((err) => res.status(500).json({ err }));

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id },
            },
            { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).json({ err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.dislikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true })
            // .then((data) => res.send(data))
            // .catch((err) => res.status(500).json({ err }));

        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id },
            },
            { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).json({ err }));
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
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        return PostModel.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
            );

            if (!theComment) return res.status(404).send("Le commentaire n'a pas été trouvé");
            theComment.text = req.body.text;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status(500).send(err);
            });
        });

    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID inconnu : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};