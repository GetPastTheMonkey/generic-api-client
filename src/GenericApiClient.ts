/********************************************************************************
 * MIT License
 *
 * Copyright (c) 2024 Sven Grübel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 ********************************************************************************/

import axios, {AxiosResponse, Method, RawAxiosRequestHeaders, RawAxiosResponseHeaders} from "axios";
export {AxiosError} from "axios";

export class GenericApiClient {
    protected static baseUrl: string = "";
    protected static headers: RawAxiosRequestHeaders = {};

    public static setBaseUrl(baseUrl: string): void {
        this.baseUrl = baseUrl;
    }

    public static setHeaders(headers: RawAxiosResponseHeaders): void {
        this.headers = headers;
    }

    private static async request<P, D, R>(method: Method, url: string, queryParams: P, data: D): Promise<R> {
        return axios({
            url: url,
            method: method,
            baseURL: this.baseUrl,
            headers: this.headers,
            params: queryParams,
            data: data,
            withCredentials: true,
        }).then((response: AxiosResponse<R, D>) => response.data);
    }

    protected static async get<P, R>(url: string, queryParams: P): Promise<R> {
        return this.request<P, null, R>("GET", url, queryParams, null);
    }

    protected static async post<P, D, R>(url: string, queryParams: P, data: D): Promise<R> {
        return this.request<P, D, R>("POST", url, queryParams, data);
    }

    protected static async patch<P, D, R>(url: string, queryParams: P, data: D): Promise<R> {
        return this.request<P, D, R>("PATCH", url, queryParams, data);
    }

    protected static async put<P, D, R>(url: string, queryParams: P, data: D): Promise<R> {
        return this.request<P, D, R>("PUT", url, queryParams, data);
    }

    protected static async delete<P, R>(url: string, queryParams: P): Promise<R> {
        return this.request<P, null, R>("DELETE", url, queryParams, null);
    }
}
