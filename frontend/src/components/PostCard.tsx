import {
    Card,
    CardContent,
    IconButton,
    Typography,
    CardActions,
    Box,
    Avatar,
    Chip,
    Skeleton
  } from '@mui/material'
  import FavoriteIcon from '@mui/icons-material/Favorite'
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  import { formatDistanceToNow } from "date-fns";

type Props = {
  post?: any;
  onLike?: () => void;
  loading?: boolean;
};

export default function PostCard({ post, onLike, loading = false }: Props) {
  if (loading) {
    return <PostCardSkeleton />;
  }

  const createdAt = new Date(Number(post.createdAt) * 1000);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <CardContent sx={{ pb: 1.5 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ width: 36, height: 36 }}>
            <AccountCircleIcon />
          </Avatar>

          <Box flex={1}>
            <Typography variant="subtitle2" fontWeight={600}>
              @{post.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(createdAt, { addSuffix: true })}
            </Typography>
          </Box>

          {/* Verified badge */}
          <Chip
            label="Verified"
            size="small"
            color="success"
            variant="outlined"
          />
        </Box>

        {/* Content */}
        <Typography
          variant="body1"
          sx={{
            mt: 1.5,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
          }}
        >
          {post.content}
        </Typography>

        {/* Blockchain reference */}
        {post.blockNumber && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mt: 1,
              display: "block",
              wordBreak: "break-all",
            }}
          >
            block#: {post.blockNumber}
          </Typography>
        )}
        {post.transactionHash && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              mt: 1,
              display: "block",
              wordBreak: "break-all",
            }}
          >
            transaction hash: {post.transactionHash}
          </Typography>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ px: 2, py: 0.5 }}>
        <IconButton size="small" onClick={onLike}>
          <FavoriteIcon fontSize="small" color="error" />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {post.likeCount}
        </Typography>
      </CardActions>
    </Card>
  );
}

function PostCardSkeleton() {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <CardContent>
          <Box display="flex" alignItems="center" gap={1}>
            <Skeleton variant="circular" width={36} height={36} />
            <Box flex={1}>
              <Skeleton width={120} height={16} />
              <Skeleton width={80} height={12} />
            </Box>
          </Box>
  
          <Skeleton sx={{ mt: 2 }} height={20} />
          <Skeleton height={20} width="80%" />
  
          <Skeleton sx={{ mt: 1 }} width="60%" height={12} />
        </CardContent>
      </Card>
    );
  }
  