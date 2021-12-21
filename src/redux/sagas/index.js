import {call, takeLatest, put} from 'redux-saga/effects'
import * as actions from '../actions/'
import * as api from '../../api/'
function* registerUser(action){
    try {
        const res = yield call(api.registerUser, action.payload);//PAYLOAD {usernmae, password, email}
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
        yield put(actions.loginUser.loginUserSuccess({...status, user: user}))

        console.log(status, user);
        if (status.success){
            const token = res.headers.authorization;
            localStorage.setItem('token', token);
            action.payload.navigate('/')
        }
        
    } catch (error) {
        console.log("LOGIN ERROR", error)
        yield put(actions.loginUser.loginUserFailure(error))
        localStorage.removeItem('token');
    }
}

function* createPost(action){
    try {
        //{message, success}
        const res = yield call(api.createPost, action.payload.data);//data: all of post
        yield put(actions.createPost.createPostSuccess())
        console.log(res.data.slug);
        if (res.data.slug){
            action.payload.navigate(`/post/${res.data.slug}`);
        }
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
        console.log("isUpdatePostInPosts", action.payload.isUpdatePostInPosts, res.data)
        if (action.payload.isUpdatePostInPosts){
            yield put(actions.updatePostOfPosts.updatePostOfPostsSuccess(res.data))
        }else{
            yield put(actions.heartPost.heartPostSuccess(res.data))
        }

        console.log(res.data)
    } catch (error) {
        console.log('error heartPost', error)
        yield put(actions.heartPost.heartPostFailure(error))
    }
}

function* bookmark(action){
    try {
        const res = yield call(api.bookmark, action.payload);

        if (action.payload.isUpdatePostInPosts){
            yield put(actions.updatePostOfPosts.updatePostOfPostsSuccess(res.data))
        }else{
            yield put(actions.bookmark.bookmarkSuccess(res.data))
        }
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

function* getPosts(action){
    try {
        const res = yield call(api.getPosts, action.payload);
        console.log(res.data);
        yield put(actions.getPosts.getPostsSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        console.log('error getPosts', error)
        yield put(actions.getPosts.getPostsFailure(error))
    }
}

function* updatePostOfPosts(action){
    try {
        const res = yield call(api.getPost, action.payload);
        console.log("RESSSSSS", res.data)
        yield put(actions.updatePostOfPosts.updatePostOfPostsSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        console.log('error updatePostOfPosts', error)
        yield put(actions.updatePostOfPosts.updatePostOfPostsFailure(error))
    }
}

function* editPost(action){
    try {
        console.log('edit post', action)
        const res = yield call(api.editPost, action.payload);
        console.log("edit post data", res.data)
        yield put(actions.editPost.editPostSuccess(res.data))
        if (action.payload.data.slug){
            action.payload.navigate(`/post/${action.payload.data.slug}`);
        }
    } catch (error) {
        console.log('error editPost', error)
        yield put(actions.editPost.editPostFailure(error))
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
    yield takeLatest(actions.getPosts.getPostsRequest, getPosts);
    yield takeLatest(actions.updatePostOfPosts.updatePostOfPostsRequest, updatePostOfPosts);
    yield takeLatest(actions.editPost.editPostRequest, editPost);
}

export default mySaga;

