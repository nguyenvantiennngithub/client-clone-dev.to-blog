import INIT_STATE from '../constants'
import {clearProfile, getProfile, getType, updatePostInProfile} from '../actions'
function profileReducers(state = INIT_STATE.profile, action){
    // console.log('reducers/registerUser', action)
    switch(action.type){
        case getType(getProfile.getProfileRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(getProfile.getProfileSuccess):{
            console.log(action.payload)
            return {
                ...state,
                isLoading: false,
                isError: false,
                isLoaded: true,
                author: action.payload.author,
                posts: action.payload.posts
            }
        }

        case getType(getProfile.getProfileFailure):{
            return{
                ...state,
                isLoading: false,
                isLoaded: true,
                isError: true,
            }
        }

        case getType(clearProfile):{
            return {
                isLoaded: false,
                isLoading: false,
                isError: false,
                author: {},
                posts: {}
            }
        }

        case getType(updatePostInProfile.updatePostInProfileRequest):{
            return {
                ...state,
            }
        }   

        case getType(updatePostInProfile.updatePostInProfileSuccess):{
            console.log(state)
            return {
                ...state,
                posts: state.posts.map(item => {
                    return item.slug === action.payload.post.slug ? action.payload.post : item; 
                })
            }
        }

        case getType(updatePostInProfile.updatePostInProfileFailure):{
            return{
                ...state,
            }
        }
        
        default:{
            return state
        }
    }
}

export default profileReducers;