import INIT_STATE from '../constants'
import {getType, getPost, heartPost, bookmark} from '../actions'


function getPostReducers(state = INIT_STATE.getPost, action){
    // console.log('reducers/getPost', action)
    switch(action.type){
        case getType(getPost.getPostRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(getPost.getPostSuccess):{
            console.log('getPostSuccess', action.payload)
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isLoaded: true,
            }
        }

        case getType(getPost.getPostFailure):{
            return{
                ...state,
                isLoading: false,
            }
        }

        case getType(heartPost.heartPostRequest):{
            return {
                ...state,
            }
        }

        case getType(heartPost.heartPostSuccess):{
            return {
                ...state,
                data: action.payload,
            }
        }

        case getType(heartPost.heartPostFailure):{
            return{
                ...state,
            }
        }

        case getType(bookmark.bookmarkRequest):{
            return {
                ...state,
            }
        }

        case getType(bookmark.bookmarkSuccess):{
            return {
                ...state,
                data: action.payload,
            }
        }

        case getType(bookmark.bookmarkFailure):{
            return{
                ...state,
            }
        }

        default:{
            return state
        }
    }
}

export default getPostReducers;