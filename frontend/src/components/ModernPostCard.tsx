import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Box, Skeleton } from '@mui/material';

type Props = {
    post?: any;
    onLike?: () => void;
    loading?: boolean;
};

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    variants: [
      {
        props: ({ expand }) => !expand,
        style: {
          transform: 'rotate(0deg)',
        },
      },
      {
        props: ({ expand }) => !!expand,
        style: {
          transform: 'rotate(180deg)',
        },
      },
    ],
  }));

export default function ModernPostCard({ post, onLike, loading = false }: Props) {
    const [expanded, setExpanded] = React.useState(false);
    if (loading) {
        return <PostCardSkeleton />;
    }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const createdAt = new Date(Number(post.createdAt) * 1000);

  return (
    <Card elevation={0}
    sx={{
      borderRadius: 3,
      border: "1px solid",
      borderColor: "divider",
      transition: "background-color 0.2s ease",
      "&:hover": {
        backgroundColor: "action.hover",
      },
    }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {post.username.substring(0,1)}
          </Avatar>
        }
        action={
            <VerifiedIcon></VerifiedIcon>
        }
        title={"@" + post.username}
        subheader={formatDistanceToNow(createdAt, { addSuffix: true })}
      />
      <CardContent sx={{ pb: 1.5 }}>
        <Typography variant="body1" sx={{
            mt: 1.5,
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          }}>
        {post.content}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, py: 0.5 }}>
        <IconButton size="small" onClick={onLike}>
          <FavoriteIcon color="error" />
        </IconButton>
        <Typography variant="caption" color="text.secondary">
          {post.likeCount}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" sx={{ marginBottom: 2, whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere", }}>Block#: {post.blockNumber}</Typography>          
          <Typography variant="body1" sx={{ marginBottom: 2, whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",}}>Transaction Hash: {post.transactionHash}</Typography>
        </CardContent>
      </Collapse>
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
