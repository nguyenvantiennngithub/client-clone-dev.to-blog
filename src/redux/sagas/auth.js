import { call, put, takeLatest } from "redux-saga/effects";
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
            yield put(actions.verifyToken({token: true, user})); 
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
            console.log('verify')
            yield put(actions.verifyToken({token: true, user})); 

            const token = res.headers.authorization;
            console.log("login user", token)
            localStorage.setItem('token', token);
            action.payload.navigate('/')
        }
        
    } catch (error) {
        console.log("LOGIN ERROR", error)
        yield put(actions.loginUser.loginUserFailure(error))
        localStorage.removeItem('token');
    }
}

function* updateInfoUser(action){
    try {
        //{message, success}
        const res = yield call(api.updateInfoUser, action.payload);
        console.log("updateInfoUser", res.data)  
        yield put(actions.updateInfoUser.updateInfoUserSuccess({data: res.data, message: 'Your profile has been updated'}));
    } catch (error) {
        yield put(actions.updateInfoUser.updateInfoUserFailure(error))
    }
}

function* changePassword(action){
    try {
        //{message, success}
        const res = yield call(api.changePassword, action.payload);
        console.log("changePassword", res.data)  
        yield put(actions.changePassword.changePasswordSuccess({message: res.data.message}));
    } catch (error) {
        yield put(actions.changePassword.changePasswordFailure(error))
    }
}

function* auth(){
    yield takeLatest(actions.registerUser.registerUserRequest, registerUser);
    yield takeLatest(actions.loginUser.loginUserRequest, loginUser);   
    yield takeLatest(actions.updateInfoUser.updateInfoUserRequest, updateInfoUser);   
    yield takeLatest(actions.changePassword.changePasswordRequest, changePassword);   
}

export default auth


