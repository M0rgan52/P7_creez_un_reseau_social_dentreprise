import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addComment } from "../../actions/post.actions";
import { isEmpty } from "../Utils";
import { timestampParser } from './../Utils';
import { getPosts } from './../../actions/post.actions';

const PostComment = ({ post }) => {
    const [text, setText] = useState("");
    const selectionUsers = useSelector((state) => state.usersReducer);
    const usersData = selectionUsers.users;
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComments = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.prenom))
                .then(() => dispatch(getPosts()))
                .then(() => setText(""));

        }
    };

    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenterId === userData._id ?
                        "comment-container client" : "comment-container"} key={comment._id}>
                        <div className="left-part">
                            <img
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (user._id === comment.commenterId) return user.picture;
                                            else return null;
                                        })
                                        .join("")
                                }
                                alt="commenter-pic"
                            />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPrenom}</h3>

                                </div>
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>

                        </div>

                    </div>
                );
            })}
            {userData._id && (
                <form action="" onSubmit={handleComments} className="comment-form">
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Repondre ici..." />
                    <br />
                    <input type="submit" value="Répondre" />
                </form>
            )}
        </div>
    );
};

export default PostComment;