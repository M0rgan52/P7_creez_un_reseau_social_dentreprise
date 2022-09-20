import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.userReducer);

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("userId", userData._id);
        data.append("picture", file);

        dispatch(uploadPicture(data, userData._id));

        function RedirectionJavascript() {
            document.location.href = "http://localhost:3000/profil";
        }
        RedirectionJavascript();
    };

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Modifier l'image</label>
            <input type="file" id="file" name="picture" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <input type="submit" value="Envoyer" />
        </form>
    );
};

export default UploadImg;