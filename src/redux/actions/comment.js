import { createAction, createActions } from "redux-actions";

// USER ACTIONS

const comment = createActions({
    commentRequest: (payload) => payload,
    commentSuccess: (payload) => payload,
    commentFailure: (err) => err,
})

const reply = createActions({
    replyRequest: (payload) => payload,
    replySuccess: (payload) => payload,
    replyFailure: (err) => err,
})

const showReply = createActions({
    showReplyRequest: (payload) => payload,
    showReplySuccess: (payload) => payload,
    showReplyFailure: (err) => err,
})


const heartComment = createActions({
    heartCommentRequest: (payload) => payload,
    heartCommentSuccess: (payload) => payload,
    heartCommentFailure: (err) => err,
})

const editComment = createActions({
    editCommentRequest: (payload) => payload,
    editCommentSuccess: (payload) => payload,
    editCommentFailure: (err) => err,
})

const deleteComment = createActions({
    deleteCommentRequest: (payload) => payload,
    deleteCommentSuccess: (payload) => payload,
    deleteCommentFailure: (err) => err,
})

const hideReply = createAction('hide reply')
const showReplyAgain = createAction('show reply again')



export {comment, reply, showReply, hideReply, showReplyAgain, heartComment, editComment, deleteComment}