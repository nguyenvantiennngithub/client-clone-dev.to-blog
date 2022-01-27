import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'


function* getProfile(action){
    try {
        const res = yield call(api.getProfile, action.payload);
        yield put(actions.getProfile.getProfileSuccess(res.data))
    } catch (error) {
        console.log('error getProfile', error)
        yield put(actions.getProfile.getProfileFailure(error))
    }
}
function* profile(){
    yield takeLatest(actions.getProfile.getProfileRequest, getProfile);
}

export default profile