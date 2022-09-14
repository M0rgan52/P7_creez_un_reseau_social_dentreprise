import React, { useContext, useEffect, useState } from "react";
import { UidContext } from './../AppContext';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from "../../actions/post.actions";
import { useSelector } from 'react-redux';

const EditDeleteComment = ({ comment, postId }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const userData = useSelector((state) => state.userReducer);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(editComment(postId, comment._id, text));
            setText("");
            setEdit(false);
        }
    };

    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id))
    };

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.commenterId) {
                setIsAuthor(true);
            }
        }
        checkAuthor();
    }, [uid, comment.commenterId])

    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="Bouton pour modifier mon commentaire" />
                </span>
            )}
            {userData._id === process.env.REACT_APP_ADMIN && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="Bouton pour modifier mon commentaire" />
                </span>
            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor="text" onClick={() => setEdit(!edit)} >Annuler</label>
                    <br />
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
                    <br />
                    <div className="btn">
                        <span onClick={() => {
                            if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
                                handleDelete();
                            }
                        }} >
                            <img src="./img/icons/trash.svg" alt="Bouton pour supprimer son commentaire" />
                        </span>
                        <input type="submit" value="Modifier mon commentaire" />
                    </div>

                </form>
            )}
            {userData._id === process.env.REACT_APP_ADMIN && edit  && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor="text" onClick={() => setEdit(!edit)} >Annuler</label>
                    <br />
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
                    <br />
                    <div className="btn">
                        <span onClick={() => {
                            if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
                                handleDelete();
                            }
                        }} >
                            <img src="./img/icons/trash.svg" alt="Bouton pour supprimer son commentaire" />
                        </span>
                        <input type="submit" value="Modifier mon commentaire" />
                    </div>

                </form>
            )}

        </div>
    );
};

export default EditDeleteComment;