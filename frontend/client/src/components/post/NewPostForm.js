import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from './../../actions/post.actions';


const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.postError);
    const dispatch = useDispatch();

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };

    const handlePost = async () => {
        if (message || postPicture) {
            const data = new FormData();
            data.append('posterId', userData._id);
            data.append('message', message);
            if (file) data.append("picture", file);

              await dispatch(addPost(data));
              dispatch(getPosts());
              cancelPost();
        } else {
            alert("Veuillez entrer un message ou une image")
        }
    };

    const cancelPost = () => {
        setMessage("");
        setPostPicture("");
        setFile("");
    };

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);

    }, [userData]);

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form" >
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Quoi de neuf ?"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                        />
                        {message || postPicture ? (
                            <li className="card-container">
                                <div className="card-left">
                                    {/* eslint-disable-next-line  */}
                                    <img src={userData.picture} alt="Photo du post" />
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.prenom}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        <img src={postPicture} alt="" />

                                    </div>
                                </div>
                            </li>
                        ) : null}
                        <div className="footer-form">
                            <div className="icon">
                                {/* eslint-disable-next-line  */}
                                <img src="./img/icons/picture.svg" alt="Bouton pour ajouter une image" />
                                <input
                                    type="file"
                                    id="file-upload"
                                    name="picture"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => handlePicture(e)}
                                />
                            </div>
                            {!isEmpty(error.format) && <p>{error.format}</p>}
                            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                            <div className="btn-send">
                                {message || postPicture ? (
                                    <button className="cancel" onClick={cancelPost}>
                                        Annuler message
                                    </button>
                                ) : null}
                                <button className="send" onClick={handlePost}>
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;