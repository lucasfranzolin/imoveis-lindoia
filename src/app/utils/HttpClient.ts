import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IHttpClient {
    http: AxiosInstance;
}

export abstract class HttpClient implements IHttpClient {
    public http: AxiosInstance;

    constructor(config: AxiosRequestConfig = {}) {
        this.http = axios.create(config);
    }
}
