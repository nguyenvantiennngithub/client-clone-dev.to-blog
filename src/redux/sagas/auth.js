import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../actions/'
import * as api from '../../api/'
import socket from "../../utils/socket";

function* registerUser(action){
    try {
        const res = yield call(api.registerUser, action.payload);//PAYLOAD {usernmae, password, email}
        const {status, user} = res.data
        yield put(actions.registerUser.registerUserSuccess(status))

        if (status.success){
            //auto loginUser when register new user success;
            socket.emit("login success", {username: user.username});
            yield put(actions.verifyToken({token: true, user})); 

            const token = res.headers.authorization
            localStorage.setItem('token', token);
            yield put(actions.loginUser.loginUserSuccess({...status, user: user}))
            
        }
    } catch (error) {
        yield put(actions.registerUser.registerUserFailure(error))
    }
}

function* loginUser(action){
    try {
        //{message, success}
        const res = yield call(api.checkLogin, action.payload);
        const {status, user} = res.data
        yield put(actions.loginUser.loginUserSuccess({...status, user: user}))

        if (status.success){
            socket.emit("login success", {username: user.username});

            yield put(actions.verifyToken({token: true, user})); 

            const token = res.headers.authorization;
            localStorage.setItem('token', token);
            action.payload.navigate('/')
        }
        
    } catch (error) {
        yield put(actions.loginUser.loginUserFailure(error))
        localStorage.removeItem('token');
    }
}

function* updateInfoUser(action){
    try {
        //{message, success}
        const res = yield call(api.updateInfoUser, action.payload);
        yield put(actions.updateInfoUser.updateInfoUserSuccess({data: res.data, message: 'Your profile has been updated'}));
    } catch (error) {
        yield put(actions.updateInfoUser.updateInfoUserFailure(error))
    }
}

function* changePassword(action){
    try {
        //{message, success}
        const res = yield call(api.changePassword, action.payload);
        yield put(actions.changePassword.changePasswordSuccess({message: res.data.message}));
    } catch (error) {
        yield put(actions.changePassword.changePasswordFailure(error))
    }
}

function* loginSocial(action){
    try {
        //{message, success}
        const res = yield call(api.loginSocial, action.payload);
        yield put(actions.loginSocial.loginSocialSuccess(res.data));
        yield put(actions.verifyToken({token: true, user: res.data.user})); 

        const token = res.headers.authorization;
        localStorage.setItem('token', token);
        action.payload.navigate('/')
    } catch (error) {
        yield put(actions.loginSocial.loginSocialFailure(error))
    }
}

function* auth(){
    yield takeLatest(actions.registerUser.registerUserRequest, registerUser);
    yield takeLatest(actions.loginUser.loginUserRequest, loginUser);
    yield takeLatest(actions.updateInfoUser.updateInfoUserRequest, updateInfoUser);   
    yield takeLatest(actions.changePassword.changePasswordRequest, changePassword);   
    yield takeLatest(actions.loginSocial.loginSocialRequest, loginSocial);   
}

export default auth


