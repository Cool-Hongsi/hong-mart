// Why did not use state for calculating data
// If so, need to add more logic whenever adding or deleting or modifying products
// Also, there will be unnecessary rerendering since it is state
// Alternatively, just add calculating function in UI

import { CartInterface } from "../type";

export const calculateSalePrice = (price: number, salePrice: number): number => {
  if (salePrice) {
    return price - (price * (salePrice * .01));
  }
  return price;
};

export const calculateTotalPrice = (price: number, salePrice: number, count: number): number => {
  return calculateSalePrice(price, salePrice) * count;
};

export const calculateSubTotalPrice = (cartInfoList: CartInterface[]): number => {
  let subTotalPrice = 0;
  cartInfoList.forEach((cart: CartInterface) => {
    subTotalPrice += calculateTotalPrice(cart.productPrice, cart.productPriceSale, cart.count);
  });
  return subTotalPrice;
};

export const calculateEstimatedTaxPrice = (cartInfoList: CartInterface[]): number => {
  return calculateSubTotalPrice(cartInfoList) * .13; // Temp Tax
};

export const calculateEstimatedTotalPrice = (cartInfoList: CartInterface[]): number => {
  return calculateSubTotalPrice(cartInfoList) + calculateEstimatedTaxPrice(cartInfoList);
};