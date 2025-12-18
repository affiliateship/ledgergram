import { Container, Grid, Fab, Card, CardContent, Box, Typography, Avatar, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CreatePostDialog from '../components/CreatePostDialog'
import { useEffect, useState } from 'react'
import { Post } from '../types/Post'
import { createAPI, fetchFeed, updatePost } from '../hooks/authAPI'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { User } from '../types/User'
import ModernPostCard from '../components/ModernPostCard'

export default function FeedPage() {
    const [posts, setPosts] = useState<Post[]>([])
    const [open, setOpen] = useState(false)

    const loadFeed = async () => {
        const data = await fetchFeed()
        setPosts(data)
    }
    
      const createPost = async (content: string) => {
        await createAPI(content)
        await loadFeed()
      }
    
      const likePost = async (id: number) => {
        await updatePost(id)
        await loadFeed()
      }

      const [user, setUser] = useState<User | null>(null);
      // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("account");
    if (stored) setUser(JSON.parse(stored));
  }, []);
    
      useEffect(() => {
        loadFeed()
        setInterval(loadFeed, 10000);
      }, [])

return (
    <Container maxWidth="sm" disableGutters sx={{ px: 1, pb: 10 }}>
      
      {/* Profile Header */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          mb: 2,
        }}
      >
        <CardContent>
          <Box display="flex" gap={2} alignItems="center">
            <Avatar sx={{ width: 72, height: 72 }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>

            <Box flex={1}>
              <Typography variant="h6" fontWeight={700}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                @{user?.username}
              </Typography>
              <Chip label="LedgerGram profile" size="small" color="success" sx={{ mt: 1 }} />
              <Typography variant="caption" fontWeight={700} display="block">
                Joined on {new Date(Number(user?.createdAt)).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      
      {/* Feed */}
      <Grid container spacing={1}>
        {posts.map((p) => (
          <Grid item xs={12} key={p.postId}>
            <ModernPostCard post={p} onLike={() => likePost(p.postId)}/>
          </Grid>
        ))}
      </Grid>

      {/* FAB */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 24, right: 24 }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <CreatePostDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={createPost}
      />

    </Container>
)}