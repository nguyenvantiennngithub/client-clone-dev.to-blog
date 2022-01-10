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
        yield put(actions.showReply.showReplySuccess({data: [...res.data], idParent: action.payload.id, isReply: true}))
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

function* editComment(action){
    try {
        const res = yield call(api.editComment, action.payload);
        console.log(res.data);
        yield put(actions.editComment.editCommentSuccess({comment: res.data.comment, id: action.payload.id}))
    } catch (error) {
        console.log(error)
        yield put(actions.editComment.editCommentFailure(error))
    }
}

function* deleteComment(action){
    try {
        const res = yield call(api.deleteComment, action.payload);
        console.log(res.data);
        yield put(actions.deleteComment.deleteCommentSuccess({comment: res.data.comment, reply: action.payload.reply, id: action.payload.id}))
    } catch (error) {
        console.log(error)
        yield put(actions.deleteComment.deleteCommentFailure(error))
    }
}

function* auth(){
    yield takeLatest(actions.comment.commentRequest, comment);
    yield takeLatest(actions.reply.replyRequest, reply);
    yield takeLatest(actions.showReply.showReplyRequest, showReply);
    yield takeLatest(actions.heartComment.heartCommentRequest, heartComment);
    yield takeLatest(actions.editComment.editCommentRequest, editComment);
    yield takeLatest(actions.deleteComment.deleteCommentRequest, deleteComment);
    
}

export default auth


