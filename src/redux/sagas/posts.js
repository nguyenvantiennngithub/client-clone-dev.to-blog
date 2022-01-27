import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'

function* getPosts(action){
    try {
        const res = yield call(api.getPosts, action.payload);
        yield put(actions.getPosts.getPostsSuccess(res.data))
    } catch (error) {
        console.log('error getPosts', error)
        yield put(actions.getPosts.getPostsFailure(error))
    }
}

function* updatePostOfPosts(action){
    try {
        const res = yield call(api.getPost, action.payload);
        yield put(actions.updatePostOfPosts.updatePostOfPostsSuccess(res.data))
    } catch (error) {
        console.log('error updatePostOfPosts', error)
        yield put(actions.updatePostOfPosts.updatePostOfPostsFailure(error))
    }
}

function* posts(){
    yield takeLatest(actions.getPosts.getPostsRequest, getPosts);
    yield takeLatest(actions.updatePostOfPosts.updatePostOfPostsRequest, updatePostOfPosts);
}

export default posts;