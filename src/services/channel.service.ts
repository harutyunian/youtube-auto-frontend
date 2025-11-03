import { HttpClient } from './http'
import { YOUTUBE_API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants'

export interface RelatedChannel {
  id: number
  channelName: string
  generalChannelId: number
  createdAt: string
  updatedAt: string
}

export interface GeneralChannel {
  id: number
  channelName: string
  relatedChannels: RelatedChannel[]
  createdAt: string
  updatedAt: string
}

export interface CreateGeneralChannelRequest {
  channelName: string
}

export interface CreateRelatedChannelRequest {
  channelName: string
  generalChannelId: number
}

export interface UpdateChannelRequest {
  channelName: string
}

const channelHttp = new HttpClient({ baseURL: YOUTUBE_API_BASE_URL })

class ChannelService {
  // General Channels
  async getAllGeneralChannels(): Promise<GeneralChannel[]> {
    return channelHttp.get<GeneralChannel[]>(API_ENDPOINTS.YOUTUBE.GENERAL_CHANNELS)
  }

  async getGeneralChannelById(id: number): Promise<GeneralChannel> {
    return channelHttp.get<GeneralChannel>(API_ENDPOINTS.YOUTUBE.GENERAL_CHANNEL(id))
  }

  async createGeneralChannel(data: CreateGeneralChannelRequest): Promise<GeneralChannel> {
    return channelHttp.post<GeneralChannel, CreateGeneralChannelRequest>(
      API_ENDPOINTS.YOUTUBE.GENERAL_CHANNEL_BASE,
      data
    )
  }

  async updateGeneralChannel(id: number, data: UpdateChannelRequest): Promise<GeneralChannel> {
    return channelHttp.put<GeneralChannel, UpdateChannelRequest>(API_ENDPOINTS.YOUTUBE.GENERAL_CHANNEL(id), data)
  }

  async deleteGeneralChannel(id: number): Promise<{ message: string }> {
    return channelHttp.delete<{ message: string }>(API_ENDPOINTS.YOUTUBE.GENERAL_CHANNEL(id))
  }

  // Related Channels
  async getAllRelatedChannels(generalChannelId?: number): Promise<RelatedChannel[]> {
    const params = generalChannelId ? { generalChannelId } : undefined
    return channelHttp.get<RelatedChannel[]>(API_ENDPOINTS.YOUTUBE.RELATED_CHANNELS, { params })
  }

  async getRelatedChannelById(id: number): Promise<RelatedChannel> {
    return channelHttp.get<RelatedChannel>(API_ENDPOINTS.YOUTUBE.RELATED_CHANNEL(id))
  }

  async createRelatedChannel(data: CreateRelatedChannelRequest): Promise<RelatedChannel> {
    return channelHttp.post<RelatedChannel, CreateRelatedChannelRequest>(
      API_ENDPOINTS.YOUTUBE.RELATED_CHANNEL_BASE,
      data
    )
  }

  async updateRelatedChannel(id: number, data: UpdateChannelRequest): Promise<RelatedChannel> {
    return channelHttp.put<RelatedChannel, UpdateChannelRequest>(API_ENDPOINTS.YOUTUBE.RELATED_CHANNEL(id), data)
  }

  async deleteRelatedChannel(id: number): Promise<{ message: string }> {
    return channelHttp.delete<{ message: string }>(API_ENDPOINTS.YOUTUBE.RELATED_CHANNEL(id))
  }
}

export default new ChannelService()

