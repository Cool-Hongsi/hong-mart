import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

console.log("=========== Configuration for redux & saga ===========");

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware)
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(createStore);