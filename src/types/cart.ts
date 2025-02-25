export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  quantity?: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "INCREASE_QUANTITY"; payload: number }
  | { type: "DECREASE_QUANTITY"; payload: number }
  | { type: "REMOVE_FROM_CART"; payload: number };
