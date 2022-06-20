import { all } from 'redux-saga/effects';
import { hongMartSagaWatcher } from './hongmart/hongmartSaga';

/* Set Saga Watcher */
export default function* rootSaga() {
  yield all([
    hongMartSagaWatcher(),
    // Add other saga watcher here...
  ]);
};