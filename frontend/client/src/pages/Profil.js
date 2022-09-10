import React from "react";
import Log from "../components/log";

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log signin={false} signup={true} />
                <div className="img-container">
                    <img src="./logos/icon-left-font.svg" alt="Logo Groupomania" />
                </div>
            </div>
        </div>

    );
};

export default Profil;