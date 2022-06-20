import produce from "immer";
import { HONG_MART_ACTION_CONST } from "../../../service/const/actionConst";
import { ADMIN_INFO, ADMIN_PRODUCT_INFO, SEARCH_INFO } from "../../../service/const/generalConst";
import { HongMartReducerActionInterface, HongMartReducerStateInterface } from "../../../service/type";

const { SET_ADMIN_INFO, SET_ADMIN_PRODUCT_INFO, SET_SEARCH_INFO, INITIALIZE_SEARCH_INFO, ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAILURE,
  READ_PRODUCT_REQUEST, READ_PRODUCT_SUCCESS, READ_PRODUCT_FAILURE, READ_SET_VALUE_FOR_UPDATE_AND_DELETE,
  UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, INITIALIZE_PRODUCT_COUNT, INCREASE_PRODUCT_COUNT,
  DECREASE_PRODUCT_COUNT, SET_INITIAL_CART_INFO, ADD_CART_INFO, DELETE_ALL_CART, DELETE_ONE_CART, } = HONG_MART_ACTION_CONST;
const { ADMIN_USERNAME, ADMIN_PASSWORD } = ADMIN_INFO;
const { CREATE_PRODUCT_CATEGORY, CREATE_PRODUCT_NAME, CREATE_PRODUCT_PRICE, CREATE_PRODUCT_PRICE_SALE,
  CREATE_PRODUCT_DESCRIPTION, READ_PRODUCT_CATEGORY, UPDATE_PRODUCT_ID, UPDATE_PRODUCT_CATEGORY,
  UPDATE_PRODUCT_NAME, UPDATE_PRODUCT_PRICE, UPDATE_PRODUCT_PRICE_SALE, UPDATE_PRODUCT_DESCRIPTION,
  DELETE_PRODUCT_ID, DELETE_PRODUCT_CATEGORY } = ADMIN_PRODUCT_INFO;
const { SEARCH_INFO_INPUT } = SEARCH_INFO;

const initState: HongMartReducerStateInterface = {
  adminProductInfo: {
    [CREATE_PRODUCT_CATEGORY]: '',
    [CREATE_PRODUCT_NAME]: '',
    [CREATE_PRODUCT_PRICE]: '',
    [CREATE_PRODUCT_PRICE_SALE]: '',
    [CREATE_PRODUCT_DESCRIPTION]: '',
    [READ_PRODUCT_CATEGORY]: '',
    [UPDATE_PRODUCT_ID]: '',
    [UPDATE_PRODUCT_CATEGORY]: '',
    [UPDATE_PRODUCT_NAME]: '',
    [UPDATE_PRODUCT_PRICE]: '',
    [UPDATE_PRODUCT_PRICE_SALE]: '',
    [UPDATE_PRODUCT_DESCRIPTION]: '',
    [DELETE_PRODUCT_ID]: '',
    [DELETE_PRODUCT_CATEGORY]: '',
  },
  adminInfo: {
    [ADMIN_USERNAME]: '',
    [ADMIN_PASSWORD]: ''
  },
  searchInfo: {
    [SEARCH_INFO_INPUT]: ''
  },
  isLoading: false, // can be used as public
  adminLoginAPI: {
    message: '',
    result: false
  },
  createProductAPI: {
    message: '',
    result: null
  },
  readProductAPI: {
    message: '',
    result: null
  },
  updateProductAPI: {
    message: '',
    result: null
  },
  deleteProductAPI: {
    message: '',
    result: null
  },
  productCount: 1,
  cartInfo: [],
};

export default function hongMartReducer(state = initState, action: HongMartReducerActionInterface) {
  return produce(state, draft => {
    switch (action.type) {
      case SET_ADMIN_INFO:
        draft.adminInfo[action.payload.inputName] = action.payload.inputValue;
        break;
      case SET_ADMIN_PRODUCT_INFO:
        draft.adminProductInfo[action.payload.inputName] = action.payload.inputValue;
        break;
      case SET_SEARCH_INFO:
        draft.searchInfo[action.payload.inputName] = action.payload.inputValue;
        break;
      case INITIALIZE_SEARCH_INFO:
        draft.searchInfo[SEARCH_INFO_INPUT] = '';
        break;
      case ADMIN_LOGIN_REQUEST:
        draft.isLoading = true;
        draft.adminLoginAPI = { ...draft.adminLoginAPI, message: '', result: false };
        break;
      case ADMIN_LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.adminLoginAPI = { ...draft.adminLoginAPI, message: action.payload.message, result: action.payload.result };
        break;
      case ADMIN_LOGIN_FAILURE:
        draft.isLoading = false;
        draft.adminLoginAPI = { ...draft.adminLoginAPI, message: action.payload.message, result: action.payload.result };
        break;
      case CREATE_PRODUCT_REQUEST:
        draft.isLoading = true;
        draft.createProductAPI = { ...draft.createProductAPI, message: '', result: null };
        break;
      case CREATE_PRODUCT_SUCCESS:
        draft.isLoading = false;
        draft.createProductAPI = { ...draft.createProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case CREATE_PRODUCT_FAILURE:
        draft.isLoading = false;
        draft.createProductAPI = { ...draft.createProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case READ_PRODUCT_REQUEST:
        draft.isLoading = true;
        draft.readProductAPI = { ...draft.readProductAPI, message: '', result: null };
        break;
      case READ_PRODUCT_SUCCESS:
        draft.isLoading = false;
        draft.readProductAPI = { ...draft.readProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case READ_PRODUCT_FAILURE:
        draft.isLoading = false;
        draft.readProductAPI = { ...draft.readProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case READ_SET_VALUE_FOR_UPDATE_AND_DELETE:
        // UPDATE
        draft.adminProductInfo[UPDATE_PRODUCT_ID] = action.payload._id;
        draft.adminProductInfo[UPDATE_PRODUCT_CATEGORY] = action.payload.productCategory;
        draft.adminProductInfo[UPDATE_PRODUCT_NAME] = action.payload.productName;
        draft.adminProductInfo[UPDATE_PRODUCT_PRICE] = action.payload.productPrice;
        draft.adminProductInfo[UPDATE_PRODUCT_PRICE_SALE] = action.payload.productPriceSale;
        draft.adminProductInfo[UPDATE_PRODUCT_DESCRIPTION] = action.payload.productDescription;
        // DELETE
        draft.adminProductInfo[DELETE_PRODUCT_ID] = action.payload._id;
        draft.adminProductInfo[DELETE_PRODUCT_CATEGORY] = action.payload.productCategory;
        break;
      case UPDATE_PRODUCT_REQUEST:
        draft.isLoading = true;
        draft.updateProductAPI = { ...draft.updateProductAPI, message: '', result: null };
        break;
      case UPDATE_PRODUCT_SUCCESS:
        draft.isLoading = false;
        draft.updateProductAPI = { ...draft.updateProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case UPDATE_PRODUCT_FAILURE:
        draft.isLoading = false;
        draft.updateProductAPI = { ...draft.updateProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case DELETE_PRODUCT_REQUEST:
        draft.isLoading = true;
        draft.deleteProductAPI = { ...draft.deleteProductAPI, message: '', result: null };
        break;
      case DELETE_PRODUCT_SUCCESS:
        draft.isLoading = false;
        draft.deleteProductAPI = { ...draft.deleteProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case DELETE_PRODUCT_FAILURE:
        draft.isLoading = false;
        draft.deleteProductAPI = { ...draft.deleteProductAPI, message: action.payload.message, result: action.payload.result };
        break;
      case INITIALIZE_PRODUCT_COUNT:
        draft.productCount = 1;
        break;
      case INCREASE_PRODUCT_COUNT:
        draft.productCount += 1;
        break;
      case DECREASE_PRODUCT_COUNT:
        draft.productCount -= 1;
        break;
      case SET_INITIAL_CART_INFO:
        draft.cartInfo = action.payload;
        break;
      case ADD_CART_INFO:
        // Keep in mind that no side effect for pure
        let addCartIndex = draft.cartInfo.findIndex((cart) => cart._id === action.payload._id);
        if (addCartIndex === -1) {
          draft.cartInfo = [...draft.cartInfo, action.payload];
        } else {
          draft.cartInfo[addCartIndex] = { ...draft.cartInfo[addCartIndex], count: draft.cartInfo[addCartIndex].count + action.payload.count };
        }
        break;
      case DELETE_ALL_CART:
        draft.cartInfo = [];
        break;
      case DELETE_ONE_CART:
        // Keep in mind that no side effect for pure
        let deleteCartIndex = draft.cartInfo.findIndex((cart) => cart._id === action.payload);
        if (deleteCartIndex > -1) {
          draft.cartInfo.splice(deleteCartIndex, 1);
        }
        break;
      default:
        return state;
    }
  })
};