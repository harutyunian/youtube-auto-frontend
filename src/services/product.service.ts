import http from './http'
import { API_ENDPOINTS } from '../constants/api.constants'

export interface Product {
  id: string
  name: string
  price: number
  description?: string
}

export interface CreateProductInput {
  name: string
  price: number
  description?: string
}

export interface UpdateProductInput {
  name?: string
  price?: number
  description?: string
}

const ProductService = {
  list: () => http.get<Product[]>(API_ENDPOINTS.PRODUCTS.BASE),
  getById: (id: string) => http.get<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(id)),
  create: (payload: CreateProductInput) => http.post<Product, CreateProductInput>(API_ENDPOINTS.PRODUCTS.BASE, payload),
  update: (id: string, payload: UpdateProductInput) =>
    http.put<Product, UpdateProductInput>(API_ENDPOINTS.PRODUCTS.BY_ID(id), payload),
  patch: (id: string, payload: UpdateProductInput) =>
    http.patch<Product, UpdateProductInput>(API_ENDPOINTS.PRODUCTS.BY_ID(id), payload),
  delete: (id: string) => http.delete<void>(API_ENDPOINTS.PRODUCTS.BY_ID(id)),
}

export default ProductService


