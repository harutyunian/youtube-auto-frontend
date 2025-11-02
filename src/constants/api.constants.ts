// API Base URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const YOUTUBE_API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'http://localhost:3000'

// API Endpoints
export const API_ENDPOINTS = {
  // YouTube Endpoints
  YOUTUBE: {
    SHORTS: (channelName: string) => `/youtube/short/${channelName}`,
  },
  // Product Endpoints (example)
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `/products/${id}`,
  },
} as const

