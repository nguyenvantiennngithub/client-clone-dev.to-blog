import registerReducers from "./registerUser";
import loginReducers from "./loginUser";
import {combineReducers} from 'redux'
import createPostReducers from "./createPost";
import getPostReducers from "./getPost";
import getPostsReducers from "./getPosts";

const createRootReducer = combineReducers({
    getPost: getPostReducers,
    getPosts: getPostsReducers,
    registerUser: registerReducers,
    loginUser: loginReducers,
    createPost: createPostReducers,
})
export default createRootReducer;
