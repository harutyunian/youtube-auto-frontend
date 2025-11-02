import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Stack from '@mui/material/Stack'
import Pagination from '@mui/material/Pagination'
import Alert from '@mui/material/Alert'
import YouTubeService, { type YouTubeShort } from '../services/youtube.service'

export default function YouTubeShorts() {
  const [channelName, setChannelName] = useState('')
  const [videos, setVideos] = useState<YouTubeShort[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [currentChannel, setCurrentChannel] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!channelName.trim()) {
      setError('Please enter a channel name')
      return
    }

    setLoading(true)
    setError(null)
    setVideos([])
    setCurrentChannel(channelName.trim())
    setPage(1)

    try {
      const data = await YouTubeService.getShorts({ channelName: channelName.trim(), page: 1 })
      setVideos(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch YouTube shorts')
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = async (_event: React.ChangeEvent<unknown>, value: number) => {
    if (!currentChannel) return

    setLoading(true)
    setError(null)
    setPage(value)

    try {
      const data = await YouTubeService.getShorts({ channelName: currentChannel, page: value })
      setVideos(data)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch YouTube shorts')
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        YouTube Shorts Finder
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4, alignItems: 'center' }}>
        <TextField
          label="Channel Name"
          variant="outlined"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
          disabled={loading}
          sx={{ flex: 1, maxWidth: 400 }}
          placeholder="Enter YouTube channel name"
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading || !channelName.trim()}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && videos.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {videos.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Found {videos.length} shorts for {currentChannel}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardActionArea href={video.url} target="_blank" rel="noopener noreferrer">
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        image={video.thumbnails.medium.url}
                        alt={video.title}
                        sx={{ height: 200, objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          bgcolor: 'rgba(0, 0, 0, 0.8)',
                          color: 'white',
                          px: 0.75,
                          py: 0.25,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                        }}
                      >
                        {formatDuration(video.durationSeconds)}
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" component="h3" noWrap title={video.title}>
                        {video.title}
                      </Typography>
                      <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          👁️ {formatViews(video.viewCount)} views
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          📅 {formatDate(video.publishedAt)}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              disabled={loading}
            />
          </Box>
        </>
      )}

      {!loading && videos.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', my: 8, color: 'text.secondary' }}>
          <Typography variant="h6">Enter a channel name to search for YouTube Shorts</Typography>
        </Box>
      )}
    </Box>
  )
}

