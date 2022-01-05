import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'

function* comment(action){
    try {
        const res = yield call(api.comment, {...action.payload, isReply: false});
        console.log(res.data);
        yield put(actions.comment.commentSuccess({...res.data, isReply: false}))
    } catch (error) {
        console.log(error)
        yield put(actions.comment.commentFailure(error))
    }
}

function* reply(action){
    try {
        const res = yield call(api.comment, {...action.payload, isReply: true});
        console.log(res.data);
        yield put(actions.reply.replySuccess({data: {...res.data, isReply: true}, idParent: action.payload.idParent}))
    } catch (error) {
        console.log(error)
        yield put(actions.reply.replyFailure(error))
    }
}

function* showReply(action){
    try {
        const res = yield call(api.showReply, action.payload);
        console.log(res.data);
        yield put(actions.showReply.showReplySuccess({data: [...res.data], idParent: action.payload, isReply: true}))
    } catch (error) {
        console.log(error)
        yield put(actions.showReply.showReplyFailure(error))
    }
}

function* heartComment(action){
    try {
        const res = yield call(api.heartComment, action.payload);
        console.log(res.data);
        yield put(actions.heartComment.heartCommentSuccess({comment: res.data.comment, id: action.payload.id}))
    } catch (error) {
        console.log(error)
        yield put(actions.heartComment.heartCommentFailure(error))
    }
}

function* auth(){
    yield takeLatest(actions.comment.commentRequest, comment);
    yield takeLatest(actions.reply.replyRequest, reply);
    yield takeLatest(actions.showReply.showReplyRequest, showReply);
    yield takeLatest(actions.heartComment.heartCommentRequest, heartComment);
    
}

export default auth


