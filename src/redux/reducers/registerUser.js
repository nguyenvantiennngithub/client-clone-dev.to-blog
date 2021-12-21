import INIT_STATE from '../constants'
import {getType, registerUser} from '../actions'
function userReducers(state = INIT_STATE.registerUser, action){
    // console.log('reducers/registerUser', action)
    switch(action.type){
        case getType(registerUser.registerUserRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(registerUser.registerUserSuccess):{
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                message: action.payload.message,
                isError: false,
            }
        }

        case getType(registerUser.registerUserFailure):{
            return{
                ...state,
                isLoading: false,
                message: '',
                isError: true,
            }
        }

        
        default:{
            return state
        }
    }
}

export default userReducers;