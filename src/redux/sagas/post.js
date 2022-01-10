import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'
import { typeUpdateReaction } from "../constants";



function* createPost(action){
    try {
        //{message, success}
        const res = yield call(api.createPost, action.payload.data);//data: all of post
        yield put(actions.createPost.createPostSuccess())
        yield put(actions.pushNewPost(res.data.slug))
        console.log(res.data);
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
        if (action.payload.typeUpdateReaction === typeUpdateReaction.posts){
            yield put(actions.updatePostOfPosts.updatePostOfPostsSuccess(res.data.post))
        }
        else if (action.payload.typeUpdateReaction === typeUpdateReaction.post){
            yield put(actions.heartPost.heartPostSuccess(res.data.post))
        }
        else if (action.payload.typeUpdateReaction === typeUpdateReaction.personalPosts){
            yield put(actions.updatePostInProfile.updatePostInProfileSuccess(res.data))
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

        if (action.payload.typeUpdateReaction === typeUpdateReaction.posts){
            yield put(actions.updatePostOfPosts.updatePostOfPostsSuccess(res.data.post))
        }
        else if (action.payload.typeUpdateReaction === typeUpdateReaction.post){
            yield put(actions.bookmark.bookmarkSuccess(res.data.post))
        }
        else if (action.payload.typeUpdateReaction === typeUpdateReaction.personalPosts){
            yield put(actions.updatePostInProfile.updatePostInProfileSuccess(res.data))
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

function* deletePost(action){
    try {
        console.log('getPersonalPosts', action)
        const res = yield call(api.deletePost, action.payload);
        console.log("deletePosts data", res.data)
        if (res.data.status){
            yield put(actions.deletePost.deletePostSuccess(action.payload))
        }
    } catch (error) {
        console.log('error deletePost', error)
        yield put(actions.deletePost.deletePostFailure(error))
    }
}


function* post(){
    yield takeLatest(actions.createPost.createPostRequest, createPost);
    yield takeLatest(actions.getPost.getPostRequest, getPost);
    yield takeLatest(actions.heartPost.heartPostRequest, heartPost);
    yield takeLatest(actions.bookmark.bookmarkRequest, bookmark);
    yield takeLatest(actions.following.followingRequest, following);
    yield takeLatest(actions.editPost.editPostRequest, editPost);
    yield takeLatest(actions.deletePost.deletePostRequest, deletePost);
}

export default post;