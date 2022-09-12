import React from "react";
import { useSelector } from 'react-redux';
import LeftNav from "../leftNav";
import userReducer from './../../reducers/user.reducer';
import UploadImg from './UploadImg';


const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="profil-container">
            <LeftNav />
            <h1> Profil de {userData.prenom} </h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="Photo de profil" />
                    <UploadImg />
                </div>


            </div>
        </div>

    );
};

export default UpdateProfil;