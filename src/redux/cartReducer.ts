import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductInCart, CartState, ShopLocation } from "@/models/cart";

const initialValue: CartState = {
  cart: [],
  sum: 0,
  shopLocation: {
    lat: "",
    lng: "",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialValue,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<ProductInCart>) => {
      state.cart.push(action.payload);
    },
    setShopLocation: (
      state: CartState,
      action: PayloadAction<ShopLocation>
    ) => {
      state.shopLocation = { ...action.payload };
    },
    minusQty: (state: CartState, action: PayloadAction<string>) => {
      state.cart = state.cart.map((product: ProductInCart) => {
        if (product._id === action.payload) {
          product.qty -= 1;
          product.totalPrice = product.qty * product.price;
        }
        return product;
      });
    },
    plusQty: (state: CartState, action: PayloadAction<string>) => {
      state.cart = state.cart.map((product: ProductInCart) => {
        if (product._id === action.payload) {
          product.qty += 1;
          product.totalPrice = product.qty * product.price;
        }
        return product;
      });
    },
    changeSum: (state: CartState) => {
      state.sum = state.cart.reduce((sum, current) => {
        return sum + current.price * current.qty;
      }, 0);
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (product) => product._id.toString() !== action.payload
      );
    },
    resetCart: () => {
      return initialValue;
    },
  },
});
