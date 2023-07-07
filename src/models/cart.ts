export interface ProductInCart {
  _id: string;
  name: string;
  qty: number;
  price: number;
  totalPrice: number;
  img: string;
  shop: string;
}

export interface ShopLocation {
  lat: string;
  lng: string;
}

export interface CartState {
  cart: ProductInCart[];
  sum: number;
  shopLocation: {
    lat: string;
    lng: string;
  };
}
