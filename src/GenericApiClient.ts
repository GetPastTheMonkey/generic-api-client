import axios, {Method} from "axios";

export class GenericApiClient {
    private static baseUrl: string = "";

    public static setBaseUrl(baseUrl: string): void {
        GenericApiClient.baseUrl = baseUrl;
    }

    private static async request<P, D, R>(method: Method, url: string, queryParams: P, data: D): Promise<R> {
        return axios({
            url: url,
            method: method,
            baseURL: GenericApiClient.baseUrl,
            params: queryParams,
            data: data,
            withCredentials: true,
        });
    }

    protected static async get<P, R>(url: string, queryParams: P): Promise<R> {
        return GenericApiClient.request<P, null, R>("GET", url, queryParams, null);
    }

    protected static async post<P, D, R>(url: string, queryParams: P, data: D): Promise<R> {
        return GenericApiClient.request<P, D, R>("POST", url, queryParams, data);
    }

    protected static async patch<P, D, R>(url: string, queryParams: P, data: D): Promise<R> {
        return GenericApiClient.request<P, D, R>("PATCH", url, queryParams, data);
    }

    protected static async delete<P, R>(url: string, queryParams: P): Promise<R> {
        return GenericApiClient.request<P, null, R>("DELETE", url, queryParams, null);
    }
}
