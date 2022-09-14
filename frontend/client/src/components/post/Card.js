import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { isEmpty } from "../Utils";
import { dateParser } from './../Utils';
import LikeButton from './LikeButton';
import { useDispatch } from 'react-redux';
import { updatePost } from "../../actions/post.actions";
import DeletePost from './DeletePost';
import PostComment from './PostComment';



const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const selectionUsers = useSelector((state) => state.usersReducer);
    const usersData = selectionUsers.users;
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();


    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdated(false);
    };

    useEffect(() => {
        if (!isEmpty(usersData[0])) {
            setIsLoading(false);
        }


    }, [usersData]);

    return (
        <li className="card-container" key={post._id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        {/* eslint-disable-next-line */}
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData.map((user) => {
                                    if (user._id === post.posterId) {
                                        return user.picture;
                                    } else {
                                        return null;
                                    }
                                }).join("")
                            }

                            alt="Photo de l'auteur du post"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {
                                        !isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if (user._id === post.posterId) {
                                                return user.prenom;
                                            } else {
                                                return null;
                                            }
                                        })
                                    }
                                </h3>
                            </div>
                            <span> {dateParser(post.createdAt)} </span>
                        </div>
                        {isUpdated === false && <p> {post.message} </p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem} >
                                        Modifier
                                    </button>
                                </div>
                            </div>
                        )}
                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="Bouton de modification de post" />
                                </div>
                                <DeletePost id={post._id} />
                            </div>
                        )}
                        {userData._id === process.env.REACT_APP_ADMIN && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="Bouton de modification de post" />
                                </div>
                                <DeletePost id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img onClick={() => setShowComments(!showComments)} src="./img/icons/message1.svg" alt="Icone de commentaire" />
                                <span> {post.comments.length} </span>
                            </div>
                            <LikeButton post={post} />
                        </div>
                        {showComments && <PostComment post={post} />}
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;