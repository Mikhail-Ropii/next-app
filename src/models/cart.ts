export interface ProductInCart {
  _id: string;
  name: string;
  qty: number;
  price: string;
  totalPrice: string;
  img: string;
  shop: string;
}

export interface ShopLocation {
  lat: string;
  lng: string;
}
