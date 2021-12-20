import registerReducers from "./registerUser";
import loginReducers from "./loginUser";
import {combineReducers} from 'redux'
import createPostReducers from "./createPost";
import getPostReducers from "./getPost";

const createRootReducer = combineReducers({
    getPost: getPostReducers,
    registerUser: registerReducers,
    loginUser: loginReducers,
    createPost: createPostReducers,
})
export default createRootReducer;
