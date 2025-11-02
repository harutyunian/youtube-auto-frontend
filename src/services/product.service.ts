import http from './http'

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
  list: () => http.get<Product[]>('/products'),
  getById: (id: string) => http.get<Product>(`/products/${id}`),
  create: (payload: CreateProductInput) => http.post<Product, CreateProductInput>('/products', payload),
  update: (id: string, payload: UpdateProductInput) =>
    http.put<Product, UpdateProductInput>(`/products/${id}`, payload),
  patch: (id: string, payload: UpdateProductInput) =>
    http.patch<Product, UpdateProductInput>(`/products/${id}`, payload),
  delete: (id: string) => http.delete<void>(`/products/${id}`),
}

export default ProductService


