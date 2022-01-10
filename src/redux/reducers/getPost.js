import INIT_STATE from '../constants'
import {getType, getPost, heartPost, bookmark, clearPostAuthor, editPost, comment, reply, showReply, hideReply, showReplyAgain, heartComment, editComment, deleteComment} from '../actions'


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
            console.log(action.payload)
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.reduce((total = [], item)=>{
                        console.log(item.cmt._id, action.payload.idParent)
                        if (item.cmt._id === action.payload.idParent){
                            total.push(
                                {
                                    ...item, 
                                    cmt: {
                                        ...item.cmt, 
                                        reply: [...item.cmt.reply, action.payload.data.cmt._id],
                                        newReply: Array.isArray(item.cmt.newReply) ? 
                                            [...item.cmt.newReply, action.payload.data.cmt._id] : 
                                            [action.payload.data.cmt._id]
                                    }
                                }, action.payload.data)
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
            console.log({data: action.payload.data})
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: (()=>{
                        var total = [];
                        for (var i = 0; i < state.data.comment.length; i++){
                            const item = state.data.comment[i];
                            console.log({item})
                            total.push(item);
                            if (item.cmt._id === action.payload.idParent){
                                const newReplyList = Array.isArray(item.cmt.newReply) ? item.cmt.newReply : 0
                                for (var j = 0; j < action.payload.data.length; j++){
                                    var flagIsPush = true;
                                    const resItem = action.payload.data[j];
                                    for (var k = 0; k < newReplyList.length; k++){
                                        const newReplyItem = newReplyList[k];
                                        if (resItem.cmt._id === newReplyItem){
                                            flagIsPush = false;
                                        }
                                    }
                                    if (flagIsPush) total.push({...resItem, isReply: action.payload.isReply})
                                }
                            }
                        }
                        console.log("Total before reutnr", total)
                        return total;
                    })()                
                    
                    
                    // comment: state.data.comment.reduce((total = [], item)=>{
                    //     for (var i = 0; i < action.payload.data.length; i++){
                    //         var payload = action.payload.data[i];
                            
                    //         total.push(item);
                    //         if (item.cmt._id === action.payload.idParent){//đây là cái container của mấy cái reply
                    //             const newReply = Array.isArray(payload.newReply) ? payload.newReply : [];
                    //             console.log()
                    //             for (var j = (i + 1); j < (i + 1) + newReply.length; j++){
                    //                 var newReplyItem = action.payload.data[j];
                                    
                    //                 if (!action.payload.data.includes(newReplyItem)){
                    //                     total.push({...payload, isReply: action.payload.isReply})
                    //                 }
                    //             }
                                
                    //         }    
                    //     }
                    //     return total;
                        // if (item.cmt._id === action.payload.idParent){
                        //     total.push(item);
                        //     action.payload.data.forEach(payload =>{
                        //         if (!Array.isArray(action.payload.newReply) || !action.payload.newReply.includes(item.cmt._id)){
                        //             total.push({...payload, isReply: action.payload.isReply})
                        //         } 
                        //     })
                        // }else{
                        //     total.push(item)
                        // }
                    // }, [])
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

        case getType(editComment.editCommentRequest):{
            return {
                ...state,
            }
        }

        case getType(editComment.editCommentSuccess):{
            console.log(action.payload)
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.map(item =>{
                        if (item.cmt._id === action.payload.id){
                            return {...item, cmt: action.payload.comment}
                        }else{
                            return item;
                        }
                    })
                }
            }
        }

        case getType(editComment.editCommentFailure):{
            return{
                ...state,
            }
        }

        case getType(deleteComment.deleteCommentRequest):{
            return {
                ...state,
            }
        }

        case getType(deleteComment.deleteCommentSuccess):{
            console.log(action.payload, state.data.comment) 
            return {
                ...state,
                data:{
                    ...state.data,
                    comment: state.data.comment.filter(item =>{    console.log(item.cmt._id !== action.payload.id, !action.payload.reply.includes(item.cmt._id), item.cmt._id !== action.payload.id || !action.payload.reply.includes(item.cmt._id))
                        return (item.cmt._id !== action.payload.id && !action.payload.reply.includes(item.cmt._id))
                    })
                }
            }
        }

        case getType(deleteComment.deleteCommentFailure):{
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