import React, { useContext, useEffect, useState } from "react";
import { UidContext } from './../AppContext';
import { useDispatch } from 'react-redux';
import { editComment } from "../../actions/post.actions";

const EditDeleteComment = ({ comment, postId }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
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
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className="edit-comment-form">
                    <label htmlFor="text" onClick={() => setEdit(!edit)} >Editer</label>
                    <br />
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} defaultValue={comment.text} />
                    <br />
                    <input type="submit" value="Modifier mon commentaire" />
                </form>
            )}

        </div>
    );
};

export default EditDeleteComment;