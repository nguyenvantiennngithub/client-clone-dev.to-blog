import { all } from 'redux-saga/effects'
import auth from './auth'
import personal from './personal'
import post from './post'
import posts from './posts'
import profile from './profile'
import comment from './comment'


function* mySaga(){
    yield all([auth(), personal(), post(), posts(), profile(), comment()])
}

export default mySaga;

