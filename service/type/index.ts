import { Session } from "inspector";

export interface HeaderInterface {
  gotoCartPage: () => void,
  onClickCloseSearchContainer: () => void,
  onChangeSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClickSearchIcon: () => void,
  onKeyDownSearchInput: (e: KeyboardEvent) => void,
  onClickSearch: () => void,
  onClickAuthButton: () => void,
  session: Session | null | {},
  status: string,
};

export interface ButtonInterface {
  title: string,
  size: string,
  onClickButton: () => void
};

export interface InputInterface {
  type: string,
  isNumber: boolean,
  placeholder: string,
  name: string,
  value: string,
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDownInput?: any
  // onKeyDownInput?: (e: KeyboardEvent) => void // can not find exact answer
};

export interface ProductInterface {
  _id: string,
  productCategory: string,
  productName: string,
  productPrice: number,
  productPriceSale: number,
  productImage: string,
  productDescription: string,
  createdAt: Date,
};

export interface ProductSingleInterface {
  product: ProductInterface
};

export interface ProductListInterface {
  productList: ProductInterface[]
};

export interface ProductDetailInterface {
  product: ProductInterface,
  productDetailType: string
};

export interface ProductImageInterface {
  product: ProductInterface,
  isClickable: boolean,
  width: number,
  height: number,
  onClickProductImage: (product: ProductInterface) => void
};

export interface CartInterface {
  _id: string,
  productCategory: string,
  productName: string,
  productPrice: number,
  productPriceSale: number,
  productImage: string,
  productDescription: string,
  createdAt: Date,
  count: number
};

export interface DialogInterface {
  dialogShow: boolean,
  dialogType: string,
  dialogTitle: string,
  dialogDesc: string,
  dialogSelectedProductId: string,
  onCloseDialog?: () => void,
  onClickYesDialog?: (dialogType: string, dialogSelectedProductId: string) => void,
};

export interface SnackbarInterface {
  snackbarOpen: boolean,
  snackbarClose: () => void,
  snackbarMessage: string
};

export interface TableInterface {
  theadList: string[],
  tbodyList?: CartInterface[] // can be more with '|' for other data,
  onClickButton?: (tbodyData: CartInterface) => void
};

export interface InputActionInterface {
  inputName: string,
  inputValue: string
};

export interface APIResultInterface {
  statusCode: number,
  message: string | unknown,
  result: null | {} | {}[]
};

export interface HongMartReducerActionInterface {
  type: string,
  payload: any
};

export interface HongMartReducerStateInterface {
  adminProductInfo: {
    [key: string]: string
  },
  adminInfo: {
    [key: string]: string
  },
  searchInfo: {
    [key: string]: string
  },
  isLoading: boolean,
  adminLoginAPI: {
    message: string,
    result: boolean
  },
  createProductAPI: {
    message: string
    result: any
  },
  readProductAPI: {
    message: string
    result: any
  },
  updateProductAPI: {
    message: string
    result: any
  },
  deleteProductAPI: {
    message: string,
    result: any
  },
  productCount: number,
  cartInfo: CartInterface[],
};