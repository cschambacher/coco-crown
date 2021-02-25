import { takeEvery, call, put } from 'redux-saga/effects';

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){
    yield console.log("fired");
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error){
        yield put(fetchCollectionsFailure(error.message))
    }


        

    // collectionRef.get().then( snapshot => {
    //     const collectionMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionMap));

    // }).catch(error => dispatch(fetchCollectionsFailure(error)))
}

export function* fetchCollectionsStart(){
    yield takeEvery(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    )
}