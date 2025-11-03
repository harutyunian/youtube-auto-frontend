// API Base URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export const YOUTUBE_API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'http://localhost:3000/youtube'

// API Endpoints
export const API_ENDPOINTS = {
  // YouTube Endpoints
  YOUTUBE: {
    SHORTS: (channelName: string) => `/short/${channelName}`,
    GENERAL_CHANNELS: '/general-channels',
    GENERAL_CHANNEL: (id: number) => `/general-channel/${id}`,
    GENERAL_CHANNEL_BASE: '/general-channel',
    RELATED_CHANNELS: '/related-channels',
    RELATED_CHANNEL: (id: number) => `/related-channel/${id}`,
    RELATED_CHANNEL_BASE: '/related-channel',
  },
  // Product Endpoints (example)
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `/products/${id}`,
  },
} as const

