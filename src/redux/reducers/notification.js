import INIT_STATE from '../constants'
import {addNotification, getNotification, getType, heartCommentNotification, replaceNotification, updatePostInNotification} from '../actions'
function loginUserReducers(state = INIT_STATE.getNotification, action){
    // console.log('reducers/loginUser', action)
    switch(action.type){

        case getType(getNotification.getNotificationRequest):{
            return {
                ...state,
                isLoading: true,
            }
        }

        case getType(getNotification.getNotificationSuccess):{
            console.log('getNotificationSuccess', action.payload)
            return {
                ...state,
                data: action.payload.result,
                totalUnread: action.payload.totalUnread,
                isLoading: false,
                isLoaded: true,
                isError: false,
            }
        }

        case getType(getNotification.getNotificationFailure):{
            return{
                ...state,
                isLoading: false,
                isError: true,
                isLoaded: true,
            }
        }

        case getType(updatePostInNotification.updatePostInNotificationRequest):{
            return {
                ...state,
            }
        }   

        case getType(updatePostInNotification.updatePostInNotificationSuccess):{
            console.log(state)
            return {
                ...state,
                data: state.data.map(item => {
                    return item.post.slug === action.payload.post.slug ? {...item, post: action.payload.post} : item; 
                })
            }
        }

        case getType(updatePostInNotification.updatePostInNotificationFailure):{
            return{
                ...state,
            }
        }

        case getType(heartCommentNotification.heartCommentNotificationRequest):{
            return {
                ...state,
            }
        }

        case getType(heartCommentNotification.heartCommentNotificationSuccess):{
            console.log(action.payload)
            return {
                ...state,
                data: state.data.map(item => {
                    if (!item.comment) return item;
                    if (item.comment._id === action.payload.id){
                        return {...item, comment: action.payload.comment}
                    }else{
                        return item;
                    }
                })
            }
        }

        case getType(heartCommentNotification.heartCommentNotificationFailure):{
            return{
                ...state,
            }
        }

        case getType(addNotification):{
            console.log("addnotification", action.payload)
            return{
                ...state,
                data: [action.payload, ...state.data],
                totalUnread: state.totalUnread+1,
            }
        }

        case getType(replaceNotification):{
            console.log("addnotification", action.payload)
            return{
                ...state,
                data: state.data.reduce((total, item) =>{
                    if (item.notifi._id === action.payload.notifi._id){
                        return total;
                    }else{
                        return [...total, item];
                    }

                }, [action.payload])
            }
        }

        default:{
            return state
        }
    }
}

export default loginUserReducers;