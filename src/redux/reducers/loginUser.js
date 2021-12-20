import INIT_STATE from '../constants'
import {getType, loginUser, verifyToken, signOut, following} from '../actions'
function loginUserReducers(state = INIT_STATE.loginUser, action){
    // console.log('reducers/loginUser', action)
    switch(action.type){
        case getType(loginUser.loginUserRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(loginUser.loginUserSuccess):{
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                token: true,
                user: action.payload.user,
                message: action.payload.message
            }
        }

        case getType(loginUser.loginUserFailure):{
            return{
                ...state,
                isLoading: false,
                token: undefined,
                message: '',
            }
        }
        case getType(verifyToken):{
            return {
                ...state,
                token: action.payload.data,
                user: action.payload.user
            }
        }

        case getType(signOut):{
            localStorage.removeItem('token');
            return {
                ...state,
                token: false,
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
        default:{
            return state
        }
    }
}

export default loginUserReducers;