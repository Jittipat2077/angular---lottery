// To parse this data:
//
//   import { Convert } from "./file";
//
//   const lottery = Convert.toLottery(json);

export interface Lottery {
  lot_id: number;
  lot_date: string;
  lot_number: number;
  lot_no: number;
  set_no: number;
  price: number;
  lot_amount: number;
}

// Converts JSON strings to/from your types
export class Convert {
  public static toLottery(json: string): Lottery[] {
    return JSON.parse(json);
  }

  public static lotteryToJson(value: Lottery[]): string {
    return JSON.stringify(value);
  }
}
