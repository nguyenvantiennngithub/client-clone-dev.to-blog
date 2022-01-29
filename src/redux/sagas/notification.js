import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'

function* getNotification(action){
    try {
        const res = yield call(api.getNotification);
        yield put(actions.getNotification.getNotificationSuccess(res.data))
    } catch (error) {
        console.log('error getNotification', error)
        yield put(actions.getNotification.getNotificationFailure(error))
    }
}

function* seenNotification(action){
    try {
        yield call(api.seenNotification, action.payload);
    } catch (error) {
        console.log(error);
    }
}

function* nootification(){
    yield takeLatest(actions.getNotification.getNotificationRequest, getNotification);
    yield takeEvery(actions.seenNotification, seenNotification);
}

export default nootification