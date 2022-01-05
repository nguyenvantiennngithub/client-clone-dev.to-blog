import registerReducers from "./registerUser";
import loginReducers from "./loginUser";
import {combineReducers} from 'redux'
import createPostReducers from "./createPost";
import getPostReducers from "./getPost";
import getPostsReducers from "./getPosts";
import getPersonalPostsReducers from "./getPersonalPosts";
import profileReducers from "./profile";
import commentReducers from "./comment";

const createRootReducer = combineReducers({
    getPost: getPostReducers,
    getPosts: getPostsReducers,
    registerUser: registerReducers,
    loginUser: loginReducers,
    createPost: createPostReducers,
    getPersonalPosts: getPersonalPostsReducers,
    profile: profileReducers,
    comment: commentReducers,
})
export default createRootReducer;
