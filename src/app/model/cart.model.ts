// To parse this data:
//
//   import { Convert } from "./file";
//
//   const cart = Convert.toCart(json);

export interface Cart {
  id: number;
  num: number;
  amount: number;
  price: number;
  lot_no: number;
  set_no: number;
  price_all: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toCart(json: string): Cart[] {
    return JSON.parse(json);
  }

  public static cartToJson(value: Cart[]): string {
    return JSON.stringify(value);
  }
}
