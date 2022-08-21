import { AxiosResponse } from "axios";
import { Endpoint, AuthEndpoint, UNIVERSAL_TOKEN } from "./base";
import { generateKey } from "../experiment";

export interface Transaction {
  to: string;
  from: string;
  date_created: Date;
  token: string;
}

abstract class UserBase {
  static login: Function;
  static register: Function;
  static loadFromLocal: Function;
  static saveKey = "ngo-chain";
  abstract wallet(): Promise<Array<Transaction>>;
  abstract transaction(tokenId: string): Promise<Transaction>;
  abstract saveToLocal(): void;
}

export interface UserData{
  id  : number, 
  username : string, 
  email : string
}

export default class User extends UserBase {
  publicKey: string;
  data: UserData
  constructor(publicKey: string) {
    super();
    this.publicKey = publicKey;
    this.saveToLocal();
    this.data      = {
      id : -1, username : '', email : ''
    }
  }
  get = () => {
    let endpoint = new AuthEndpoint('get', 'user/profile', UNIVERSAL_TOKEN)
    return new Promise((res, rej) => {
      endpoint.req()
      .then((resp) => {
        this.data   = resp.data
        res(resp)
      })
      .catch((err) => rej(err))
    })
  }
  saveToLocal = () => {
    let payload = { publicKey: this.publicKey, token: UNIVERSAL_TOKEN };
    let token = JSON.stringify(payload);
    let saveStr = Buffer.from(token).toString("base64");
    localStorage.setItem(User.saveKey, saveStr);
  };
  wallet = (): Promise<Array<Transaction>> => {
    let endpoint = new AuthEndpoint("get", "user/wallet", UNIVERSAL_TOKEN);
    return new Promise((res, rej) => {
      endpoint
        .req()
        .then((resp) => res(resp.data))
        .catch((err) => rej(err));
    });
  };
  transaction = (tokenId: string): Promise<Transaction> => {
    let endpoint = new AuthEndpoint(
      "get",
      `user/wallet/${tokenId}`,
      UNIVERSAL_TOKEN
    );
    return new Promise((res, rej) => {
      endpoint
        .req()
        .then((resp) => res(resp.data))
        .catch((err) => rej(err));
    });
  };
  checkLogin = (): Promise<AxiosResponse> => {
    let endpoint = new AuthEndpoint("get", `user/checklogin`, UNIVERSAL_TOKEN);
    return endpoint.req();
  };

  static login = (username: string, password: string): Promise<User> => {
    let payload = {
      username: username,
      password: password,
    };
    let endpoint = new Endpoint("post", "user/login");
    return new Promise((res, rej) => {
      endpoint
        .req(payload)
        .then((resp) => {
          UNIVERSAL_TOKEN.token = resp.data.token;
          res(new User(resp.data.public_key));
        })
        .catch((err) => rej(err));
    });
  };
  static register = (
    username: string,
    email: string,
    password: string,
    public_key: string
  ): Promise<User> => {
    let payload = {
      username: username,
      email: email,
      password: password,
      public_key: public_key,
    };
    let endpoint = new Endpoint("post", "user/register");
    return new Promise((res, rej) => {
      generateKey().then((val) => {
        payload.public_key = val;
        endpoint
          .req(payload)
          .then((resp) => {
            UNIVERSAL_TOKEN.token = resp.data.token;
            res(new User(val));
          })
          .catch((err) => rej(err));
      });
    });
  };
  static loadFromLocal = (): User => {
    let userToken = localStorage.getItem(User.saveKey);
    let userJson = Buffer.from(userToken, "base64").toString("utf-8");
    let userTok = JSON.parse(userJson);
    UNIVERSAL_TOKEN.token = userTok.token.token;
    let publicKey = userTok.publicKey;
    return new User(publicKey);
  };
}
