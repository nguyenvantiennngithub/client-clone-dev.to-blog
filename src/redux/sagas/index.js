import { all } from 'redux-saga/effects'
import auth from './auth'
import personal from './personal'
import post from './post'
import posts from './posts'
import profile from './profile'


function* mySaga(){
    yield all([auth(), personal(), post(), posts(), profile()])
}

export default mySaga;

