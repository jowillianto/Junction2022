import { getBalance } from "../experiment";
import { Endpoint } from "./base";

export interface NGOObject {
  name: string;
  description: string;
  avatar: string;
  value: number;
  wallet: string;
  amount: number;
}

abstract class NGOBase {
  static all: Function;
}

export default class NGO extends NGOBase {
  static all = (params: Object): Promise<Array<NGOObject>> => {
    let endpoint = new Endpoint("get", "ngo/");
    return new Promise((res, rej) => {
      endpoint
      .req({}, {}, params)
      .then((resp) => {
        console.log(resp.data);
        for (let i = 0; i < resp.data.length; i++) {
          getBalance(resp.data[i].wallet).then(
            (val) => (resp.data[i]["amount"] = val)
          );
        }
        console.log(resp.data);
        res(resp.data);
      })
      .catch((err) => rej(err));
    });
  };
}
