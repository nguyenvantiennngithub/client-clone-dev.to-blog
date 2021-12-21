import INIT_STATE from '../constants'
import {getType, getPost, heartPost, bookmark, clearPostAuthor, editPost} from '../actions'


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
                isError: false,
            }
        }

        case getType(getPost.getPostFailure):{
            return{
                ...state,
                isLoading: false,
                isError: true,
                isLoaded: true,
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

        

        case getType(clearPostAuthor):{
            console.log("CLEAR POST AUTHOR")
            return {
                ...state,
                data: {
                    author: {},
                    post: {},
                },
                isLoaded: false,
                
            }
        }

        case getType(editPost.editPostRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(editPost.editPostSuccess):{
            return {
                ...state,
                data: {
                    ...state.data,
                    post: action.payload,
                    isLoading: false,
                    isError: false,
                    isLoaded: true,
                },
            }
        }

        case getType(editPost.editPostFailure):{
            return{
                ...state,
                isLoading: false,
                isError: true,
                isLoaded: true,
            }
        }

        default:{
            return state
        }
    }
}

export default getPostReducers;