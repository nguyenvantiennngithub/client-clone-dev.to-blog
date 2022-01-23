import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'

function* getNotification(action){
    try {
        console.log('getNotification', action)
        const res = yield call(api.getNotification);
        console.log("getNotification data", res.data)
        yield put(actions.getNotification.getNotificationSuccess(res.data))
    } catch (error) {
        console.log('error getNotification', error)
        yield put(actions.getNotification.getNotificationFailure(error))
    }
}

function* seenNotification(action){
    try {
        console.log('seenNotification', action)
        yield call(api.seenNotification, action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* nootification(){
    yield takeLatest(actions.getNotification.getNotificationRequest, getNotification);
    yield takeLatest(actions.seenNotification, seenNotification);
}

export default nootification