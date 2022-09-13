import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { isEmpty } from "../Utils";
import { timestampParser } from './../Utils';

const PostComment = ({ post }) => {
    const [text, setText] = useState("");
    const selectionUsers = useSelector((state) => state.usersReducer);
    const usersData = selectionUsers.users;
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComments = () => {

    };

    return (
        <div className="comments-container">
            {post.comments.map((comment) => {
                return (
                    <div className={comment.commenterId === userData._id ?
                        "comment-containe client" : "comment-container"} key={comment._id}>
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
            }

            )}
        </div>
    );
};

export default PostComment;