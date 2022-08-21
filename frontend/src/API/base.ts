import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import {
  Method, 
  AxiosResponse
} from 'axios'

abstract class BaseEndpoint{
  req     : Function
  baseUrl : string
  url     : string
  method  : string
  
  constructor(method : Method, url : string, baseUrl : string = ''){
    this.method   = method
    this.url      = this._constructUrl(baseUrl, url)
  }
  _constructUrl(baseUrl : string, url : string) : string{
    if(baseUrl === '') baseUrl = process.env.REACT_APP_API_ENDPOINT
    return `${process.env.REACT_APP_API_ENDPOINT}${url}`
  }
}

export class Endpoint extends BaseEndpoint{
  req =   (
    payload : Object = {}, 
    headers : AxiosRequestHeaders = {}, 
    params : Object = {}
  ) : Promise<AxiosResponse> => {
    let config : AxiosRequestConfig = {
      method  : this.method, 
      url     : this.url, 
      headers : headers, 
      data    : payload, 
      params  : params
    }
    console.log(config)
    return axios.request(config)
  }
}

export interface Token{
  token   : String
}

export let UNIVERSAL_TOKEN : Token = {
  token   : ''
}

export class AuthEndpoint extends BaseEndpoint{
  token   : Token
  constructor(
    method : Method, url : string, token : Token, baseUrl : string = ''
  ){
    super(method, url, baseUrl)
    this.token  = token
  }
  _createHeader = (token : Token) : Object => {
    return {Authorization : `Token ${token.token}`}
  }
  req = (
    payload : Object = {}, headers : AxiosRequestHeaders = {}, params : Object = {}
  ) : Promise<AxiosResponse> => {
    headers = Object.assign(headers, this._createHeader(this.token))
    let config : AxiosRequestConfig = {
      method  : this.method, 
      url     : this.url, 
      headers : headers, 
      data    : payload, 
      params  : params
    }
    return axios.request(config)
  }
}

