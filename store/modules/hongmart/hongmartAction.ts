import { HONG_MART_ACTION_CONST } from "../../../service/const/actionConst";
import { APIResultInterface, CartInterface, InputActionInterface, ProductInterface } from "../../../service/type";

const { SET_ADMIN_INFO, SET_ADMIN_PRODUCT_INFO, SET_SEARCH_INFO, INITIALIZE_SEARCH_INFO, ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
  READ_PRODUCT_REQUEST, READ_PRODUCT_SUCCESS, READ_PRODUCT_FAILURE, READ_SET_VALUE_FOR_UPDATE_AND_DELETE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, INITIALIZE_PRODUCT_COUNT, INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT, SET_INITIAL_CART_INFO, ADD_CART_INFO, DELETE_ALL_CART, DELETE_ONE_CART,
} = HONG_MART_ACTION_CONST;

export const hong_mart_set_admin_info = (inputData: InputActionInterface) => ({
  type: SET_ADMIN_INFO, payload: inputData
});

export const hong_mart_set_admin_product_info = (inputData: InputActionInterface) => ({
  type: SET_ADMIN_PRODUCT_INFO, payload: inputData
});

export const hong_mart_set_search_info = (inputData: InputActionInterface) => ({
  type: SET_SEARCH_INFO, payload: inputData
});

export const hong_mart_initialize_search_info = () => ({
  type: INITIALIZE_SEARCH_INFO
});

export const hong_mart_admin_login_request = () => ({
  type: ADMIN_LOGIN_REQUEST
});

export const hong_mart_admin_login_success = (dataFromServer: APIResultInterface) => ({
  type: ADMIN_LOGIN_SUCCESS, payload: dataFromServer
});

export const hong_mart_admin_login_failure = (dataFromServer: APIResultInterface) => ({
  type: ADMIN_LOGIN_FAILURE, payload: dataFromServer
});

export const hong_mart_create_product_request = (imageFile: File) => ({
  type: CREATE_PRODUCT_REQUEST, payload: imageFile
});

export const hong_mart_create_product_success = (dataFromServer: APIResultInterface) => ({
  type: CREATE_PRODUCT_SUCCESS, payload: dataFromServer
});

export const hong_mart_create_product_failure = (dataFromServer: APIResultInterface) => ({
  type: CREATE_PRODUCT_FAILURE, payload: dataFromServer
});

export const hong_mart_read_product_request = () => ({
  type: READ_PRODUCT_REQUEST,
});

export const hong_mart_read_product_success = (dataFromServer: APIResultInterface) => ({
  type: READ_PRODUCT_SUCCESS, payload: dataFromServer
});

export const hong_mart_read_product_failure = (dataFromServer: APIResultInterface) => ({
  type: READ_PRODUCT_FAILURE, payload: dataFromServer
});

export const hong_mart_read_set_value_for_update_and_delete = (product: ProductInterface) => ({
  type: READ_SET_VALUE_FOR_UPDATE_AND_DELETE, payload: product
});

export const hong_mart_update_product_request = () => ({
  type: UPDATE_PRODUCT_REQUEST,
});

export const hong_mart_update_product_success = (dataFromServer: APIResultInterface) => ({
  type: UPDATE_PRODUCT_SUCCESS, payload: dataFromServer
});

export const hong_mart_update_product_failure = (dataFromServer: APIResultInterface) => ({
  type: UPDATE_PRODUCT_FAILURE, payload: dataFromServer
});

export const hong_mart_delete_product_request = () => ({
  type: DELETE_PRODUCT_REQUEST,
});

export const hong_mart_delete_product_success = (dataFromServer: APIResultInterface) => ({
  type: DELETE_PRODUCT_SUCCESS, payload: dataFromServer
});

export const hong_mart_delete_product_failure = (dataFromServer: APIResultInterface) => ({
  type: DELETE_PRODUCT_FAILURE, payload: dataFromServer
});

export const hong_mart_initialize_product_count = () => ({
  type: INITIALIZE_PRODUCT_COUNT
});

export const hong_mart_increase_product_count = () => ({
  type: INCREASE_PRODUCT_COUNT
});

export const hong_mart_decrease_product_count = () => ({
  type: DECREASE_PRODUCT_COUNT
});

export const hong_mart_set_initial_cart_info = (cartInfo: CartInterface[]) => ({
  type: SET_INITIAL_CART_INFO, payload: cartInfo
});

export const hong_mart_add_cart_info = (cartInfo: CartInterface) => ({
  type: ADD_CART_INFO, payload: cartInfo
});

export const hong_mart_delete_all_cart_info = () => ({
  type: DELETE_ALL_CART
});

export const hong_mart_delete_one_cart_info = (_id: string) => ({
  type: DELETE_ONE_CART, payload: _id
});
