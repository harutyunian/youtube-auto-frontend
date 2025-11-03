import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import ChannelService, {
  type GeneralChannel,
  type RelatedChannel,
} from '../services/channel.service'

export default function ChannelManagement() {
  const [generalChannels, setGeneralChannels] = useState<GeneralChannel[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // General Channel states
  const [newGeneralChannelName, setNewGeneralChannelName] = useState('')
  const [generalChannelEditModal, setGeneralChannelEditModal] = useState<{
    open: boolean
    channel: GeneralChannel | null
    name: string
  }>({ open: false, channel: null, name: '' })

  // Related Channel states
  const [relatedChannelModal, setRelatedChannelModal] = useState<{
    open: boolean
    generalChannelId: number | null
    mode: 'add' | 'edit'
    channel: RelatedChannel | null
    name: string
  }>({ open: false, generalChannelId: null, mode: 'add', channel: null, name: '' })

  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{
    open: boolean
    type: 'general' | 'related'
    id: number | null
    name: string
  }>({ open: false, type: 'general', id: null, name: '' })

  useEffect(() => {
    fetchGeneralChannels()
  }, [])

  const fetchGeneralChannels = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await ChannelService.getAllGeneralChannels()
      setGeneralChannels(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch general channels')
    } finally {
      setLoading(false)
    }
  }

  const handleAddGeneralChannel = async () => {
    if (!newGeneralChannelName.trim()) {
      setError('Channel name cannot be empty')
      return
    }

    setLoading(true)
    setError(null)
    try {
      await ChannelService.createGeneralChannel({ channelName: newGeneralChannelName.trim() })
      setNewGeneralChannelName('')
      setSuccess('General channel added successfully')
      await fetchGeneralChannels()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add general channel')
    } finally {
      setLoading(false)
    }
  }

  const handleEditGeneralChannel = (channel: GeneralChannel) => {
    setGeneralChannelEditModal({ open: true, channel, name: channel.channelName })
  }

  const handleUpdateGeneralChannel = async () => {
    if (!generalChannelEditModal.channel || !generalChannelEditModal.name.trim()) {
      setError('Channel name cannot be empty')
      return
    }

    setLoading(true)
    setError(null)
    try {
      await ChannelService.updateGeneralChannel(generalChannelEditModal.channel.id, {
        channelName: generalChannelEditModal.name.trim(),
      })
      setGeneralChannelEditModal({ open: false, channel: null, name: '' })
      setSuccess('General channel updated successfully')
      await fetchGeneralChannels()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update general channel')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGeneralChannel = (channel: GeneralChannel) => {
    setDeleteConfirmModal({ open: true, type: 'general', id: channel.id, name: channel.channelName })
  }

  const confirmDeleteGeneralChannel = async () => {
    if (!deleteConfirmModal.id) return

    setLoading(true)
    setError(null)
    try {
      await ChannelService.deleteGeneralChannel(deleteConfirmModal.id)
      setDeleteConfirmModal({ open: false, type: 'general', id: null, name: '' })
      setSuccess('General channel deleted successfully')
      await fetchGeneralChannels()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete general channel')
    } finally {
      setLoading(false)
    }
  }

  const handleAddRelatedChannel = (generalChannelId: number) => {
    setRelatedChannelModal({ open: true, generalChannelId, mode: 'add', channel: null, name: '' })
  }

  const handleEditRelatedChannel = (channel: RelatedChannel) => {
    setRelatedChannelModal({
      open: true,
      generalChannelId: channel.generalChannelId,
      mode: 'edit',
      channel,
      name: channel.channelName,
    })
  }

  const handleSaveRelatedChannel = async () => {
    if (!relatedChannelModal.name.trim()) {
      setError('Channel name cannot be empty')
      return
    }

    if (relatedChannelModal.mode === 'add' && !relatedChannelModal.generalChannelId) {
      setError('General channel ID is required')
      return
    }

    setLoading(true)
    setError(null)
    try {
      if (relatedChannelModal.mode === 'add') {
        await ChannelService.createRelatedChannel({
          channelName: relatedChannelModal.name.trim(),
          generalChannelId: relatedChannelModal.generalChannelId!,
        })
        setSuccess('Related channel added successfully')
      } else {
        if (!relatedChannelModal.channel) return
        await ChannelService.updateRelatedChannel(relatedChannelModal.channel.id, {
          channelName: relatedChannelModal.name.trim(),
        })
        setSuccess('Related channel updated successfully')
      }
      setRelatedChannelModal({ open: false, generalChannelId: null, mode: 'add', channel: null, name: '' })
      await fetchGeneralChannels()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save related channel')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRelatedChannel = (channel: RelatedChannel) => {
    setDeleteConfirmModal({ open: true, type: 'related', id: channel.id, name: channel.channelName })
  }

  const confirmDeleteRelatedChannel = async () => {
    if (!deleteConfirmModal.id) return

    setLoading(true)
    setError(null)
    try {
      await ChannelService.deleteRelatedChannel(deleteConfirmModal.id)
      setDeleteConfirmModal({ open: false, type: 'general', id: null, name: '' })
      setSuccess('Related channel deleted successfully')
      await fetchGeneralChannels()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete related channel')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Channel Management
      </Typography>

      {/* Success/Error Messages */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Add General Channel Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Add General Channel
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Channel Name"
              variant="outlined"
              value={newGeneralChannelName}
              onChange={(e) => setNewGeneralChannelName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddGeneralChannel()
                }
              }}
              disabled={loading}
              sx={{ flex: 1, maxWidth: 400 }}
              placeholder="Enter channel name"
            />
            <Button
              variant="contained"
              onClick={handleAddGeneralChannel}
              disabled={loading || !newGeneralChannelName.trim()}
              startIcon={<AddIcon />}
            >
              Add General Channel
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* General Channels List */}
      {loading && generalChannels.length === 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {generalChannels.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', my: 8, color: 'text.secondary' }}>
          <Typography variant="h6">No general channels found. Add one to get started!</Typography>
        </Box>
      )}

      <Stack spacing={3}>
        {generalChannels.map((channel) => (
          <Card key={channel.id}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6">{channel.channelName}</Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditGeneralChannel(channel)}
                    disabled={loading}
                    aria-label="edit general channel"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteGeneralChannel(channel)}
                    disabled={loading}
                    aria-label="delete general channel"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Related Channels:
              </Typography>

              {channel.relatedChannels.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                  No related channels yet
                </Typography>
              ) : (
                <List dense>
                  {channel.relatedChannels.map((relatedChannel) => (
                    <ListItem key={relatedChannel.id} sx={{ pl: 0 }}>
                      <ListItemText primary={relatedChannel.channelName} />
                      <ListItemSecondaryAction>
                        <Stack direction="row" spacing={0.5}>
                          <IconButton
                            edge="end"
                            color="primary"
                            size="small"
                            onClick={() => handleEditRelatedChannel(relatedChannel)}
                            disabled={loading}
                            aria-label="edit related channel"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            edge="end"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteRelatedChannel(relatedChannel)}
                            disabled={loading}
                            aria-label="delete related channel"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              )}

              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => handleAddRelatedChannel(channel.id)}
                disabled={loading}
                sx={{ mt: 1 }}
              >
                Add Related Channel
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Edit General Channel Modal */}
      <Dialog
        open={generalChannelEditModal.open}
        onClose={() => setGeneralChannelEditModal({ open: false, channel: null, name: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit General Channel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Channel Name"
            fullWidth
            variant="outlined"
            value={generalChannelEditModal.name}
            onChange={(e) =>
              setGeneralChannelEditModal({ ...generalChannelEditModal, name: e.target.value })
            }
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleUpdateGeneralChannel()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGeneralChannelEditModal({ open: false, channel: null, name: '' })}>
            Cancel
          </Button>
          <Button onClick={handleUpdateGeneralChannel} variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Related Channel Modal */}
      <Dialog
        open={relatedChannelModal.open}
        onClose={() => setRelatedChannelModal({ open: false, generalChannelId: null, mode: 'add', channel: null, name: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {relatedChannelModal.mode === 'add' ? 'Add Related Channel' : 'Edit Related Channel'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Channel Name"
            fullWidth
            variant="outlined"
            value={relatedChannelModal.name}
            onChange={(e) => setRelatedChannelModal({ ...relatedChannelModal, name: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSaveRelatedChannel()
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setRelatedChannelModal({ open: false, generalChannelId: null, mode: 'add', channel: null, name: '' })
            }
          >
            Cancel
          </Button>
          <Button onClick={handleSaveRelatedChannel} variant="contained" disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmModal.open}
        onClose={() => setDeleteConfirmModal({ open: false, type: 'general', id: null, name: '' })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{' '}
            <strong>{deleteConfirmModal.name}</strong>?{' '}
            {deleteConfirmModal.type === 'general' && 'This will also delete all related channels.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmModal({ open: false, type: 'general', id: null, name: '' })}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (deleteConfirmModal.type === 'general') {
                confirmDeleteGeneralChannel()
              } else {
                confirmDeleteRelatedChannel()
              }
            }}
            variant="contained"
            color="error"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

