import INIT_STATE from '../constants'
import {getType, loginUser, verifyToken, signOut, following, pushNewPost, updateInfoUser, resetMessage, changePassword} from '../actions'
function loginUserReducers(state = INIT_STATE.loginUser, action){
    // console.log('reducers/loginUser', action)
    switch(action.type){
        case getType(loginUser.loginUserRequest):{
            return {
                ...state,
                isLoading: true,
                message: '',
            }
        }

        case getType(loginUser.loginUserSuccess):{
            return {
                ...state,
                isLoading: false,
                isError: false,
                token: action.payload.success,
                user: action.payload.user,
                message: action.payload.message,
                isVerify: true,

            }
        }

        case getType(loginUser.loginUserFailure):{
            return{
                ...state,
                isLoading: false,
                token: undefined,
                message: '',
                isVerify: true,
                isError: true,
            }
        }
        case getType(verifyToken):{
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isVerify: true,
            }
        }

        case getType(signOut):{
            localStorage.removeItem('token');
            return {
                ...state,
                token: false,
                isVerify: true,
                user: undefined
            }
        }

        case getType(following.followingRequest):{
            return {
                ...state,
            }
        }

        case getType(following.followingSuccess):{
            return {
                ...state,
                user: action.payload,
            }
        }

        case getType(following.followingFailure):{
            return{
                ...state,
            }
        }

        case getType(pushNewPost):{
            return {
                ...state,
                user: {
                    ...state.user,
                    posts: [...state.user.posts, action.payload]
                }
            }
        }


        case getType(updateInfoUser.updateInfoUserRequest):{
            return {
                ...state,
            }
        }

        case getType(updateInfoUser.updateInfoUserSuccess):{
            return {
                ...state,
                user: action.payload.data,
                message: action.payload.message,
            }
        }

        case getType(updateInfoUser.updateInfoUserFailure):{
            return{
                ...state,
            }
        }

        case getType(changePassword.changePasswordRequest):{
            return {
                ...state,
            }
        }

        case getType(changePassword.changePasswordSuccess):{
            return {
                ...state,
                message: action.payload.message,
            }
        }

        case getType(changePassword.changePasswordFailure):{
            return{
                ...state,
            }
        }

        case getType(resetMessage):{
            return {
                ...state,
                message: '',
            }
        }

        default:{
            return state
        }
    }
}

export default loginUserReducers;