import { createAction, createActions } from "redux-actions";


const getNotification = createActions({
    getNotificationRequest: (payload) => payload,
    getNotificationSuccess: (payload) => payload,
    getNotificationFailure: (err) => err,
})

const updatePostInNotification = createActions({
    updatePostInNotificationRequest: (payload) => payload,
    updatePostInNotificationSuccess: (payload) => payload,
    updatePostInNotificationFailure: (err) => err,
})

const heartCommentNotification = createActions({
    heartCommentNotificationRequest: (payload) => payload,
    heartCommentNotificationSuccess: (payload) => payload,
    heartCommentNotificationFailure: (err) => err,
})

const addNotification = createAction('add notification')
const replaceNotification = createAction('replace notification')
const updateUnreadNotification = createAction('updateUnreadNotification')

export {getNotification, updatePostInNotification, heartCommentNotification, addNotification, replaceNotification, updateUnreadNotification}