import { takeLatest, put, select } from "redux-saga/effects";
import { ADMIN_INFO, ADMIN_PRODUCT_INFO } from "../../../service/const/generalConst";
import { HONG_MART_ACTION_CONST } from '../../../service/const/actionConst';
import { addDelay } from "../../../service/util/delay";
import { adminLoginAPI, createProductAPI, readProductAPI, updateProductAPI, deleteProductAPI } from "../../../service/api";
import {
  hong_mart_admin_login_success, hong_mart_admin_login_failure, hong_mart_create_product_success,
  hong_mart_create_product_failure, hong_mart_read_product_success, hong_mart_read_product_failure,
  hong_mart_update_product_success, hong_mart_update_product_failure, hong_mart_delete_product_success,
  hong_mart_delete_product_failure
} from "./hongmartAction";
import { HongMartReducerActionInterface } from "../../../service/type";

const { ADMIN_USERNAME, ADMIN_PASSWORD } = ADMIN_INFO;
const { ADMIN_LOGIN_REQUEST, CREATE_PRODUCT_REQUEST, READ_PRODUCT_REQUEST, UPDATE_PRODUCT_REQUEST, DELETE_PRODUCT_REQUEST } = HONG_MART_ACTION_CONST;
const { CREATE_PRODUCT_CATEGORY, CREATE_PRODUCT_NAME, CREATE_PRODUCT_PRICE, CREATE_PRODUCT_PRICE_SALE,
  CREATE_PRODUCT_DESCRIPTION, READ_PRODUCT_CATEGORY, UPDATE_PRODUCT_ID, UPDATE_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_NAME, UPDATE_PRODUCT_PRICE, UPDATE_PRODUCT_PRICE_SALE, UPDATE_PRODUCT_DESCRIPTION,
  DELETE_PRODUCT_ID, DELETE_PRODUCT_CATEGORY } = ADMIN_PRODUCT_INFO;

function* hongMartAdminLoginRequestFunc(action: HongMartReducerActionInterface): any {
  const reducerSelect = yield select();

  yield addDelay();

  try {
    let response = yield adminLoginAPI({
      adminUsername: reducerSelect.hongMartReducer.adminInfo[ADMIN_USERNAME],
      adminPassword: reducerSelect.hongMartReducer.adminInfo[ADMIN_PASSWORD]
    });

    if (response.statusCode === 200 && response.result) {
      yield put(hong_mart_admin_login_success(response));
    } else {
      yield put(hong_mart_admin_login_failure(response));
    }
  } catch (err) {
    console.log(err);
    yield put(hong_mart_admin_login_failure({ statusCode: 400, message: err, result: false }));
  }
};

function* hongMartCreateProductRequestFunc(action: HongMartReducerActionInterface): any {
  const body = new FormData();

  body.append("file", action.payload);
  body.append("upload_preset", "hong-mart"); // for cloudinary (hong-mart is directory name)

  // 하기 작업을 Server Side로 빼서 해봤는데 안됨... 그냥 여기서 하고 url을 받고 Server로 보내야 할 듯
  let uploadImageResponseData;

  try {
    const uploadImageResponse = yield fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`, {
      method: "POST",
      body: body
    });

    uploadImageResponseData = yield uploadImageResponse.json();
    console.log("Success to upload image");
  } catch (err) {
    yield put(hong_mart_create_product_failure({ statusCode: 400, message: err, result: null }));
  }

  const reducerSelect = yield select();

  try {
    const response = yield createProductAPI({
      productCategory: reducerSelect.hongMartReducer.adminProductInfo[CREATE_PRODUCT_CATEGORY],
      productName: reducerSelect.hongMartReducer.adminProductInfo[CREATE_PRODUCT_NAME],
      productPrice: parseFloat(reducerSelect.hongMartReducer.adminProductInfo[CREATE_PRODUCT_PRICE]),
      productPriceSale: parseFloat(reducerSelect.hongMartReducer.adminProductInfo[CREATE_PRODUCT_PRICE_SALE]),
      productDescription: reducerSelect.hongMartReducer.adminProductInfo[CREATE_PRODUCT_DESCRIPTION],
      productImage: (uploadImageResponseData.url) ? uploadImageResponseData.url : '',
    });

    console.log(response);

    if (response.statusCode === 200) {
      yield put(hong_mart_create_product_success(response));
    } else {
      yield put(hong_mart_create_product_failure(response));
    }
  } catch (err) {
    yield put(hong_mart_create_product_failure({ statusCode: 400, message: err, result: null }));
  }
};

function* hongMartReadProductRequestFunc(action: HongMartReducerActionInterface): any {
  const reducerSelect = yield select();

  try {
    const response = yield readProductAPI({
      productCategory: reducerSelect.hongMartReducer.adminProductInfo[READ_PRODUCT_CATEGORY]
    });

    if (response.statusCode === 200) {
      yield put(hong_mart_read_product_success(response));
    } else {
      yield put(hong_mart_read_product_failure(response));
    }
  } catch (err) {
    yield put(hong_mart_read_product_failure({ statusCode: 400, message: err, result: null }));
  }
};

function* hongMartUpdateProductRequestFunc(action: HongMartReducerActionInterface): any {
  const reducerSelect = yield select();

  try {
    const response = yield updateProductAPI({
      productId: reducerSelect.hongMartReducer.adminProductInfo[UPDATE_PRODUCT_ID],
      productCategory: reducerSelect.hongMartReducer.adminProductInfo[UPDATE_PRODUCT_CATEGORY],
      productName: reducerSelect.hongMartReducer.adminProductInfo[UPDATE_PRODUCT_NAME],
      productPrice: parseFloat(reducerSelect.hongMartReducer.adminProductInfo[UPDATE_PRODUCT_PRICE]),
      productPriceSale: parseFloat(reducerSelect.hongMartReducer.adminProductInfo[UPDATE_PRODUCT_PRICE_SALE]),
      productDescription: reducerSelect.hongMartReducer.adminProductInfo[UPDATE_PRODUCT_DESCRIPTION]
    });

    if (response.statusCode === 200) {
      yield put(hong_mart_update_product_success(response));
    } else {
      yield put(hong_mart_update_product_failure(response));
    }
  } catch (err) {
    yield put(hong_mart_update_product_failure({ statusCode: 400, message: err, result: null }));
  }
};

function* hongMartDeleteProductRequestFunc(action: HongMartReducerActionInterface): any {
  const reducerSelect = yield select();

  try {
    const response = yield deleteProductAPI({
      productId: reducerSelect.hongMartReducer.adminProductInfo[DELETE_PRODUCT_ID],
      productCategory: reducerSelect.hongMartReducer.adminProductInfo[DELETE_PRODUCT_CATEGORY]
    });

    if (response.statusCode === 200) {
      yield put(hong_mart_delete_product_success(response));
    } else {
      yield put(hong_mart_delete_product_failure(response));
    }
  } catch (err) {
    yield put(hong_mart_delete_product_failure({ statusCode: 400, message: err, result: null }));
  }
};

export function* hongMartSagaWatcher() {
  yield takeLatest(ADMIN_LOGIN_REQUEST, hongMartAdminLoginRequestFunc);
  yield takeLatest(CREATE_PRODUCT_REQUEST, hongMartCreateProductRequestFunc);
  yield takeLatest(READ_PRODUCT_REQUEST, hongMartReadProductRequestFunc);
  yield takeLatest(UPDATE_PRODUCT_REQUEST, hongMartUpdateProductRequestFunc);
  yield takeLatest(DELETE_PRODUCT_REQUEST, hongMartDeleteProductRequestFunc);
};