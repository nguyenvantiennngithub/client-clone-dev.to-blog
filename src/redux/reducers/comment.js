import INIT_STATE from '../constants'
import {getType, comment} from '../actions'


function commentReducers(state = INIT_STATE.getPost, action){
    // console.log('reducers/comment', action)
    switch(action.type){
        

        default:{
            return state
        }
    }
}

export default commentReducers;