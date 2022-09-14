import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updatePrenom, updateNom, updateFonction } from "../../actions/user.actions";
import LeftNav from "../leftNav";
import UploadImg from './UploadImg';
import { dateParser } from './../Utils';


const UpdateProfil = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [fonction, setFonction] = useState("");
    const [updateFormPrenom, setUpdateFormPrenom] = useState(false);
    const [updateFormNom, setUpdateFormNom] = useState(false);
    const [updateFormFonction, setUpdateFormFonction] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector((state) => state.errorReducer.userError);
    const dispatch = useDispatch();

    const handleUpdatePrenom = () => {
        dispatch(updatePrenom(userData._id, prenom));
        setUpdateFormPrenom(false);
    };
    const handleUpdateNom = () => {
        dispatch(updateNom(userData._id, nom));
        setUpdateFormNom(false);
    };
    const handleUpdateFonction = () => {
        dispatch(updateFonction(userData._id, fonction));
        setUpdateFormFonction(false);
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
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
                <div className="right-part">
                    <div>
                        <h3>Prénom</h3>
                        {updateFormPrenom === false && (
                            <>
                                <p onClick={() => setUpdateFormPrenom(!updateFormPrenom)}>{userData.prenom}</p>
                                <button onClick={() => setUpdateFormPrenom(!updateFormPrenom)}>Modifier le prénom</button>
                            </>
                        )}
                        {updateFormPrenom && (
                            <>
                                <textarea type="text" defaultValue={userData.prenom} onChange={(e) => setPrenom(e.target.value)}></textarea>
                                <button onClick={handleUpdatePrenom}>Valider</button>
                            </>
                        )}
                    </div>
                    <br />
                    <div>
                        <h3>Nom</h3>
                        {updateFormNom === false && (
                            <>
                                <p onClick={() => setUpdateFormNom(!updateFormNom)}>{userData.nom}</p>
                                <button onClick={() => setUpdateFormNom(!updateFormNom)}>Modifier le nom</button>
                            </>
                        )}
                        {updateFormNom && (
                            <>
                                <textarea type="text" defaultValue={userData.nom} onChange={(e) => setNom(e.target.value)}></textarea>
                                <button onClick={handleUpdateNom}>Valider</button>
                            </>
                        )}
                    </div>
                    <br />
                    <div>
                        <h3>Fonction</h3>
                        {updateFormFonction === false && (
                            <>
                                <p onClick={() => setUpdateFormFonction(!updateFormFonction)}>{userData.fonction}</p>
                                <button onClick={() => setUpdateFormFonction(!updateFormFonction)}>Modifier la fonction</button>
                            </>
                        )}
                        {updateFormFonction && (
                            <>
                                <textarea type="text" defaultValue={userData.fonction} onChange={(e) => setFonction(e.target.value)}></textarea>
                                <button onClick={handleUpdateFonction}>Valider</button>
                            </>
                        )}
                    </div>
                    <h4>Compte créé le : {dateParser(userData.createdAt)}</h4>
                </div>

            </div>
        </div>

    );
};

export default UpdateProfil;