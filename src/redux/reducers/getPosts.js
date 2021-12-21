import INIT_STATE from '../constants'
import {getType, getPosts, updatePostOfPosts} from '../actions'


function getPostsReducers(state = INIT_STATE.getPosts, action){
    // console.log('reducers/getPosts', action)
    switch(action.type){
        case getType(getPosts.getPostsRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(getPosts.getPostsSuccess):{
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                isError: false,
                data: action.payload
            }
        }

        case getType(getPosts.getPostsFailure):{
            return{
                ...state,
                isError: true,
                isLoading: false,
                isLoaded: true,
            }
        }


        case getType(updatePostOfPosts.updatePostOfPostsRequest):{
            return {
                ...state,
            }
        }   

        case getType(updatePostOfPosts.updatePostOfPostsSuccess):{
            return {
                ...state,
                data: state.data.map(item => {
                    return item.post.slug === action.payload.post.slug ? action.payload : item; 
                })
            }
        }

        case getType(updatePostOfPosts.updatePostOfPostsFailure):{
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