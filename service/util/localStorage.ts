import { ProductInterface, CartInterface } from "../type";

export const addToCart = (product: ProductInterface, count: number) => {
  let currentCart: CartInterface[] = (getFromCart()) ? getFromCart() : [];

  // Prevent repeated product added
  let repeatedProductIndex = currentCart.findIndex((cart) => cart._id === product._id);

  if (repeatedProductIndex === -1) {
    currentCart.push({
      ...product,
      count // count: count
    });
  } else {
    currentCart[repeatedProductIndex].count += count; // just increase count
  }

  localStorage.setItem('cart', JSON.stringify(currentCart));
};

export const getFromCart = (): CartInterface[] => {
  return JSON.parse(localStorage.getItem('cart')!);
};

export const deleteAllCart = () => {
  localStorage.clear();
};

export const deleteOneCart = (_id: string) => {
  let currentCart: CartInterface[] = getFromCart();
  let repeatedProductIndex = currentCart.findIndex((cart) => cart._id === _id);

  if (repeatedProductIndex > -1) {
    currentCart.splice(repeatedProductIndex, 1);

    localStorage.setItem('cart', JSON.stringify(currentCart));
  }
};