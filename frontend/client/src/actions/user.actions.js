import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_PRENOM = "UPDATE_PRENOM";
export const UPDATE_NOM = "UPDATE_NOM";
export const UPDATE_FONCTION = "UPDATE_FONCTION";


export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const uploadPicture = (data, id) => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
            .then((res) => {
                return axios
                    .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
                    .then((res) => {
                        dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
                    })
            })
            .catch((err) => console.log(err));
    };
};

export const updatePrenom = (userId, prenom) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { prenom },
        })
            .then((res) => {
                dispatch({ type: UPDATE_PRENOM, payload: prenom });
            })
            .catch((err) => console.log(err));
    };
};

export const updateNom = (userId, nom) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { nom },
        })
            .then((res) => {
                dispatch({ type: UPDATE_NOM, payload: nom });
            })
            .catch((err) => console.log(err));
    };
};


export const updateFonction = (userId, fonction) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
            data: { fonction },
        })
            .then((res) => {
                dispatch({ type: UPDATE_FONCTION, payload: fonction });
            })
            .catch((err) => console.log(err));
    };
};

