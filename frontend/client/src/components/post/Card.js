import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { isEmpty } from "../Utils";
import { dateParser } from './../Utils';
import LikeButton from './LikeButton';



const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    // const userData = useSelector((state) => state.userReducer);

    console.log(usersData);

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
                        <p> {post.message} </p>
                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic" />}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="Icone de commentaire" />
                                <span> {post.comments.length} </span>
                            </div>
                            <LikeButton />
                        </div>

                    </div>
                </>
            )}
        </li>
    );
};

export default Card;