import {all, call} from 'redux-saga/effects'

import { fetchCollectionsStart} from './shop/shop.sagas'

export default function* rootSaga(){
    // all runs all the code concurrently side by side
    yield all([
        call(fetchCollectionsStart)
    ])
}