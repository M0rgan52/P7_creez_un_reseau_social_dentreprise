import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updatePrenom, updateNom, updateFonction } from "../../actions/user.actions";
import LeftNav from "../leftNav";
// import userReducer from './../../reducers/user.reducer';
import UploadImg from './UploadImg';


const UpdateProfil = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [fonction, setFonction] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdatePrenom = () => {
        dispatch(updatePrenom(userData._id, prenom));
        setUpdateForm(false);
    };
    const handleUpdateNom = () => {
        dispatch(updateNom(userData._id, nom));
        setUpdateForm(false);
    };
    const handleUpdateFonction = () => {
        dispatch(updateFonction(userData._id, fonction));
        setUpdateForm(false);
    };


    return (
        <div className="profil-container">
            <LeftNav />
            <h1> Profil de {userData.prenom} </h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    {/* eslint-disable-next-line */}
                    <img src={userData.picture} alt="Photo de profil" />
                    <UploadImg />
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Prénom</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.prenom}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier le prénom</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea type="text" defaultValue={userData.prenom} onChange={(e) => setPrenom(e.target.value)}></textarea>
                                <button onClick={handleUpdatePrenom}>Valider</button>
                            </>
                        )}
                    </div>
                    <br />
                    <div className="bio-update">
                        <h3>Nom</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.nom}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier le nom</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea type="text" defaultValue={userData.nom} onChange={(e) => setNom(e.target.value)}></textarea>
                                <button onClick={handleUpdateNom}>Valider</button>
                            </>
                        )}
                    </div>
                    <br />
                    <div className="bio-update">
                        <h3>Fonction</h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.fonction}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}>Modifier la fonction</button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea type="text" defaultValue={userData.fonction} onChange={(e) => setFonction(e.target.value)}></textarea>
                                <button onClick={handleUpdateFonction}>Valider</button>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>

    );
};

export default UpdateProfil;