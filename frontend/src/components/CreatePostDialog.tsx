import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField
  } from '@mui/material'
  import { useState } from 'react'
  
  type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (content: string) => void
  }
  
  export default function CreatePostDialog({
    open,
    onClose,
    onSubmit
  }: Props) {
    const [content, setContent] = useState('')
  
    const handleSubmit = () => {
      if (!content.trim()) return
      onSubmit(content)
      setContent('')
      onClose()
    }
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Create Post</DialogTitle>
  
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="What's on your mind?"
            fullWidth
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
  