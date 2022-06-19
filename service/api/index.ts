import { API_ADDRESS } from '../stage';
import { API_CONST } from '../const/apiConst';

const { ADMIN_LOGIN, CREATE_PRODUCT, READ_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } = API_CONST;

const callFetch = async (endPoint: string, method: string, body: string | null, headers: {}) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_ADDRESS}${endPoint}`, {
      method: method,
      body: body,
      headers: { ...headers },
    })
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        reject(e);
      });
  });
};

export const adminLoginAPI = async (loginData: object) => {
  const endPoint = ADMIN_LOGIN;
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const res = await callFetch(endPoint, 'POST', JSON.stringify(loginData), headers);
    return res;
  } catch (err) {
    return err;
  }
};

export const createProductAPI = async (productData: object) => {
  const endPoint = CREATE_PRODUCT;
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const res = await callFetch(endPoint, 'POST', JSON.stringify(productData), headers);
    return res;
  } catch (err) {
    return err;
  }
};

export const readProductAPI = async (productData: { productCategory: string | string[] | undefined }) => {
  const endPoint = `${READ_PRODUCT}?productCategory=${productData.productCategory}`;
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const res = await callFetch(endPoint, 'GET', null, headers);
    return res;
  } catch (err) {
    return err;
  }
};

export const updateProductAPI = async (productData: object) => {
  const endPoint = UPDATE_PRODUCT;
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const res = await callFetch(endPoint, 'PUT', JSON.stringify(productData), headers);
    return res;
  } catch (err) {
    return err;
  }
};

export const deleteProductAPI = async (productData: { productId: string, productCategory: string }) => {
  const endPoint = DELETE_PRODUCT;
  const headers = {
    'Content-Type': 'application/json'
  };

  try {
    const res = await callFetch(endPoint, 'DELETE', JSON.stringify(productData), headers);
    return res;
  } catch (err) {
    return err;
  }
};
