import INIT_STATE from '../constants'
import {getType, getPersonalPosts, deletePost} from '../actions'


function getPostsReducers(state = INIT_STATE.getPersonalPosts, action){
    // console.log('reducers/getPosts', action)
    switch(action.type){
        case getType(getPersonalPosts.getPersonalPostsRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(getPersonalPosts.getPersonalPostsSuccess):{
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                isError: false,
                posts: action.payload.posts,
                followers: action.payload.followers,
                following: action.payload.following,
            }
        }

        case getType(getPersonalPosts.getPersonalPostsFailure):{
            return{
                ...state,
                isError: true,
                isLoading: false,
                isLoaded: true,
            }
        }

        case getType(deletePost.deletePostRequest):{
            return {
                ...state,
            }
        }   

        case getType(deletePost.deletePostSuccess):{
            console.log(state)
            return {
                ...state,
                data: state.data.filter(item => {
                    return item.slug !== action.payload;
                })
            }
        }

        case getType(deletePost.deletePostFailure):{
            return{
                ...state,
            }
        }

        default:{
            return state
        }
    }
}

export default getPostsReducers;