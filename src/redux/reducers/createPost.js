import INIT_STATE from '../constants'
import {getType, createPost} from '../actions'


function createPostReducers(state = INIT_STATE.createPost, action){
    // console.log('reducers/createPost', action)
    switch(action.type){
        case getType(createPost.createPostRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(createPost.createPostSuccess):{
            return {
                ...state,
                isLoading: false,
            }
        }

        case getType(createPost.createPostFailure):{
            return{
                ...state,
                isLoading: false,
            }
        }

        default:{
            return state
        }
    }
}

export default createPostReducers;