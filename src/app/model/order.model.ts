// To parse this data:
//
//   import { Convert } from "./file";
//
//   const order = Convert.toOrder(json);

export interface Order {
  order_id: number;
  orders_loterry_num: number;
  orders_loterry_amount: number;
  orders_loterry_price: number;
  mem_id: number;
  order_date: string;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toOrder(json: string): Order[] {
    return JSON.parse(json);
  }

  public static orderToJson(value: Order[]): string {
    return JSON.stringify(value);
  }
}
