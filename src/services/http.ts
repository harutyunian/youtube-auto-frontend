import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

export class HttpClient {
  private axiosInstance: AxiosInstance
  private authToken: string | null = null

  constructor(config?: AxiosRequestConfig) {
    const baseURL = (config?.baseURL as string | undefined) ?? import.meta.env.VITE_API_BASE_URL ?? '/api'
    this.axiosInstance = axios.create({
      baseURL,
      timeout: config?.timeout ?? 15000,
      withCredentials: config?.withCredentials ?? false,
      ...config,
    })

    this.axiosInstance.interceptors.request.use((requestConfig) => {
      if (this.authToken) {
        requestConfig.headers = requestConfig.headers ?? {}
        requestConfig.headers.Authorization = `Bearer ${this.authToken}`
      }
      return requestConfig
    })

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(error)
    )
  }

  setAuthToken(token: string | null) {
    this.authToken = token
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.get<T>(url, config)
    return res.data as T
  }

  async post<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.post<T>(url, body, config)
    return res.data as T
  }

  async put<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.put<T>(url, body, config)
    return res.data as T
  }

  async patch<T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.patch<T>(url, body, config)
    return res.data as T
  }

  async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.delete<T>(url, config)
    return res.data as T
  }

  async head<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.head<T>(url, config)
    return res.data as T
  }

  async options<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.options<T>(url, config)
    return res.data as T
  }
}

export type HttpError = AxiosError

export const http = new HttpClient()
export default http


