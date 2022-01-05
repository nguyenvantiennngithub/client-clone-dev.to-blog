import INIT_STATE from '../constants'
import {getType, getPost, heartPost, bookmark, clearPostAuthor, editPost, comment, reply, showReply, hideReply, showReplyAgain, heartComment} from '../actions'


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

        case getType(comment.commentRequest):{
            return {
                ...state,
            }
        }

        case getType(comment.commentSuccess):{
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: [action.payload, ...state.data.comment]
                }
            }
        }

        case getType(comment.commentFailure):{
            return{
                ...state,
            }
        }
        case getType(reply.replyRequest):{
            return {
                ...state,
            }
        }

        case getType(reply.replySuccess):{
            console.log(state)
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.reduce((total = [], item)=>{
                        console.log(item.cmt._id, action.payload.idParent)
                        if (item.cmt._id === action.payload.idParent){
                            total.push(item, action.payload.data)
                        }else{
                            total.push(item)
                        }
                        return total;
                    }, [])
                }
            }
        }

        case getType(showReply.showReplyRequest):{
            return {
                ...state,
            }
        }

        case getType(showReply.showReplySuccess):{
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.reduce((total = [], item)=>{
                        if (item.cmt._id === action.payload.idParent){
                            total.push(item);
                            action.payload.data.forEach(payload =>{
                                total.push({...payload, isReply: action.payload.isReply})
                            })
                        }else{
                            total.push(item)
                        }
                        return total;
                    }, [])
                }
            }
        }

        case getType(showReply.showReplyFailure):{
            return{
                ...state,
            }
        }


        case getType(hideReply):{
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.map(item =>{
                        if (action.payload.includes(item.cmt._id)){
                            item.isHide = true;
                            return item;
                        }else{
                            return item;
                        }
                    })
                }
            }
        }
        case getType(showReplyAgain):{
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.map(item =>{
                        if (action.payload.includes(item.cmt._id)){
                            item.isHide = false;
                            return item;
                        }else{
                            return item;
                        }
                    })
                }
            }
        }
        
        case getType(heartComment.heartCommentRequest):{
            return {
                ...state,
            }
        }

        case getType(heartComment.heartCommentSuccess):{
            console.log(action.payload)
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.map(item =>{
                        if (item.cmt._id === action.payload.id){
                            console.log({...item, cmt: action.payload.comment})
                            return {...item, cmt: action.payload.comment}
                        }else{
                            return item;
                        }
                    })
                }
              
            }
        }

        case getType(heartComment.heartCommentFailure):{
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