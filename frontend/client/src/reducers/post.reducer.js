import { GET_POSTS, LIKE_POST, DISLIKE_POST, UPDATE_POST, DELETE_POST } from './../actions/post.actions';
const initialState = {};



export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: [action.payload.userId, ...post.likers],
                    };
                }
                return post;
            });
        case DISLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        likers: post.likers.filter((id) => id !== action.payload.userId),
                    };
                }
                return post;
            });
        case UPDATE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    return {
                        ...post,
                        message: action.payload.message
                    };
                } else {
                    return post
                }
            });
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.postId);

        default:
            return state;
    }
};