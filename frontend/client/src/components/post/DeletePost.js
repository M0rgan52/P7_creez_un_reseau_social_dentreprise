import React from "react";
import { useDispatch } from 'react-redux';
import { deletePost } from "../../actions/post.actions";

const DeletePost = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = () => {
        dispatch(deletePost(props.id));
    };

    return (
        <div onClick={() => {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
                deleteQuote();
            }
        }} >
            <img src="./img/icons/trash.svg" alt="Bouton de suppression" />

        </div>
    );
};

export default DeletePost;