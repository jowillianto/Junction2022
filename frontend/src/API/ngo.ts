import { Endpoint } from "./base";

export interface NGOObject {
  name: string;
  description: string;
  avatar: string;
  value: number;
  wallet: string;
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
        .then((resp) => res(resp.data))
        .catch((err) => rej(err));
    });
  };
}
