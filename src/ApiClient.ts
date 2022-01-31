import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Config } from "./config";
import Cookies from "js-cookie";
import { objectToUrlParams } from "./lib";
import camelcaseKeys from "camelcase-keys";

type AxiosJSONResponse<T> = AxiosResponse & {
  success: boolean;
  error?: string;
  data: T;
};

class APIClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create();
  }

  public async get<T>(
    path: string,
    queryStringData?: { [key: string]: string | number }
  ) {
    await this.setHeaders("GET");
    const url = `${path}${objectToUrlParams(queryStringData)}`;
    const response = await this.api.get<T>(`${Config.API_BASE_URL}${url}`);
    return this.getResponse(response);
  }

  private getResponse<T>(response: AxiosResponse<T>): T {
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return camelcaseKeys(response.data, { deep: true });
  }

  public async login<T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    const headers: any = {};
    headers.Accept = "application/json";
    headers["Access-Control-Allow-Origin"] = "*";
    const auth = `${Config.API_KEY}:${Config.API_SECRET}`;
    const encodedToken = await Buffer.from(auth).toString("base64");
    headers["Authorization"] = "Basic " + encodedToken;
    this.api.defaults.headers = headers;

    const loginData = {
      grant_type: "password",
      scope: "write",
      ...data,
    };
    // const bodyFormData = this.prepareData("POST", data);
    const response = await this.api.post<T>(
      `${Config.API_AUTH_BASE_URL}${path}${objectToUrlParams(loginData)}`
    );
    const res = this.getResponse(response);
    return res;
  }

  public async post<T>(
    path: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    await this.setHeaders("POST");

    const bodyFormData = this.prepareData("POST", data);

    const response = await this.api.post<AxiosJSONResponse<T>>(
      `${Config.API_BASE_URL}${path}.json`,
      bodyFormData,
      config
    );

    return this.getResponse(response);
  }

  private prepareData(method: "POST" | "PUT", data: any) {
    const formData = new FormData();
    if (!data) {
      return formData;
    }

    Object.keys(data).forEach((k) => {
      if (typeof data[k] === "undefined") {
        return;
      }
      formData.set(k, data[k]);
    });
    return formData;
  }

  private async setHeaders(method: "GET" | "POST" | "PUT") {
    const token = await this.getToken();

    const headers: any = {};

    if (["GET", "POST", "PUT"].includes(method)) {
      headers.Accept = "application/json";
    }

    if (["PUT", "POST"].includes(method)) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    this.api.defaults.headers = headers;
  }

  private async getToken() {
    return Cookies.get("authUser") ?? "";
  }
}

const singleton = new APIClient();

export { singleton as ApiClient };
