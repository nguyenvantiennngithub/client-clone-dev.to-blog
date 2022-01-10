import INIT_STATE from '../constants'
import {getType, getPosts, updatePostOfPosts, clearPosts} from '../actions'


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

        case getType(clearPosts):{
            return {
                data: [],
                isError: false,
                isLoaded: false,
                isLoading: false,
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
                    return item.post.slug === action.payload.slug ? {...item, post: action.payload} : item; 
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