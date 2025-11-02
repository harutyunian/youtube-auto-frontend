import { HttpClient } from './http'
import { YOUTUBE_API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants'

export interface Thumbnail {
  url: string
  width: number
  height: number
}

export interface Thumbnails {
  default: Thumbnail
  medium: Thumbnail
  high: Thumbnail
  standard: Thumbnail
  maxres: Thumbnail
}

export interface YouTubeShort {
  id: string
  title: string
  publishedAt: string
  viewCount: number
  durationSeconds: number
  url: string
  thumbnails: Thumbnails
}

export interface GetShortsParams {
  channelName: string
  page?: number
}

const youtubeHttp = new HttpClient({ baseURL: YOUTUBE_API_BASE_URL })

class YouTubeService {
  async getShorts({ channelName, page }: GetShortsParams): Promise<YouTubeShort[]> {
    const params = page ? { page } : undefined
    return youtubeHttp.get<YouTubeShort[]>(API_ENDPOINTS.YOUTUBE.SHORTS(channelName), { params })
  }
}

export default new YouTubeService()

