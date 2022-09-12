import { GET_USER, UPLOAD_PICTURE, UPDATE_PRENOM, UPDATE_NOM, UPDATE_FONCTION } from './../actions/user.actions';
const initialState = {};


export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPLOAD_PICTURE:
            return {
                ...state,
                picture: action.payload
            };

        case UPDATE_PRENOM:
            return {
                ...state,
                prenom: action.payload
            };

        case UPDATE_NOM:
            return {
                ...state,
                nom: action.payload
            };

        case UPDATE_FONCTION:
            return {
                ...state,
                fonction: action.payload
            };


        default:
            return state;
    }
};