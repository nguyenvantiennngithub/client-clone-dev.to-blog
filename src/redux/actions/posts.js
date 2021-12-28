import { createAction, createActions } from "redux-actions";

const clearPosts = createAction('clearPosts');

const getPosts = createActions({
    getPostsRequest: (payload) => payload,
    getPostsSuccess: (payload) => payload,
    getPostsFailure: (err) => err,
})

const updatePostOfPosts = createActions({
    updatePostOfPostsRequest: (payload) => payload,
    updatePostOfPostsSuccess: (payload) => payload,
    updatePostOfPostsFailure: (err) => err,
})
export {getPosts, updatePostOfPosts, clearPosts,}