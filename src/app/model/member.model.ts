// To parse this data:
//
//   import { Convert } from "./file";
//
//   const member = Convert.toMember(json);

export interface Member {
    mem_id:    number;
    firstname: string;
    lastname:  string;
    email:     string;
    password:  string;
    birthday:  string;
    phone:     number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMember(json: string): Member[] {
        return JSON.parse(json);
    }

    public static memberToJson(value: Member[]): string {
        return JSON.stringify(value);
    }
}
