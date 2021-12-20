import {call, takeLatest, put} from 'redux-saga/effects'
import * as actions from '../actions/'
import * as api from '../../api/'
function* registerUser(action){
    try {
        const res = yield call(api.registerUser, action.payload);
        const {status, user} = res.data
        console.log(res.data);
        yield put(actions.registerUser.registerUserSuccess(status))
        if (status.success){
            //auto loginUser when register new user success;
            const token = res.headers.authorization
            localStorage.setItem('token', token);
            yield put(actions.loginUser.loginUserSuccess({...status, user: user}))
        }
    } catch (error) {
        console.log(error)
        yield put(actions.registerUser.registerUserFailure(error))
    }
}

function* loginUser(action){
    try {
        //{message, success}
        const res = yield call(api.checkLogin, action.payload);
        const {status, user} = res.data
        const token = res.headers.authorization;
        localStorage.setItem('token', token);
        yield put(actions.loginUser.loginUserSuccess({...status, user: user}))
    } catch (error) {
        yield put(actions.loginUser.loginUserFailure(error))
        localStorage.removeItem('token');
    }
}

function* createPost(action){
    try {
        //{message, success}
        const res = yield call(api.createPost, action.payload.data);
        yield put(actions.createPost.createPostSuccess())
        console.log(res.data.slug);
        action.payload.navigate(`/post/${res.data.slug}`);
        //redirect to 
    } catch (error) {
        console.log('error createPost', error)
        yield put(actions.createPost.createPostFailure(error))
    }
}

function* getPost(action){
    try {
        const res = yield call(api.getPost, action.payload);
        yield put(actions.getPost.getPostSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        console.log('error getPost', error)
        yield put(actions.getPost.getPostFailure(error))
    }
}

function* heartPost(action){
    try {
        const res = yield call(api.heartPost, action.payload);
        yield put(actions.heartPost.heartPostSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        console.log('error heartPost', error)
        yield put(actions.heartPost.heartPostFailure(error))
    }
}

function* bookmark(action){
    try {
        const res = yield call(api.bookmark, action.payload);
        yield put(actions.bookmark.bookmarkSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        console.log('error bookmark', error)
        yield put(actions.bookmark.bookmarkFailure(error))
    }
}

function* following(action){
    try {
        const res = yield call(api.followUser, action.payload);
        yield put(actions.following.followingSuccess(res.data.my))
        console.log(res.data)
    } catch (error) {
        console.log('error following', error)
        yield put(actions.following.followingFailure(error))
    }
}

function* mySaga(){
    // const res = yield call(api.verifyToken, localStorage.getItem('token'));
    // yield put(actions.verifyToken(res.data));//res.data = Bool(token)
    
    yield takeLatest(actions.registerUser.registerUserRequest, registerUser);
    yield takeLatest(actions.loginUser.loginUserRequest, loginUser);
    yield takeLatest(actions.createPost.createPostRequest, createPost);
    yield takeLatest(actions.getPost.getPostRequest, getPost);
    yield takeLatest(actions.heartPost.heartPostRequest, heartPost);
    yield takeLatest(actions.bookmark.bookmarkRequest, bookmark);
    yield takeLatest(actions.following.followingRequest, following);
}

export default mySaga;

