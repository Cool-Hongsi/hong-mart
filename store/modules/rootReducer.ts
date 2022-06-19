import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import hongMartReducer from './hongmart/hongmartReducer';

const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    // SSR에서 Store 접근 시, HYDRATE라는 액션을 통해서 서버의 스토어와 클라이언트의 스토어를 합쳐주는 작업을 수행한다.
    console.log("Hydrate!");
    return {
      // ...state,
      ...action.payload
    };
  }
  return combineReducers({
    hongMartReducer,
    // 여기에 다른 reducer 추가
  })(state, action);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;