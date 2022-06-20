import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import hongMartReducer from './hongmart/hongmartReducer';

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    // Implement when accessing from SSR
    // Conduct incorporation for both client & server store.
    // console.log("Hydrate!");
    return {
      // ...state,
      ...action.payload
    };
  }
  return combineReducers({
    hongMartReducer,
    // Add other reducers here...
  })(state, action);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;