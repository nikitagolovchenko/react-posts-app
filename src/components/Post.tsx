import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '75%',
    },
    title: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: theme.palette.common.white,
      backgroundColor: theme.palette.action.active
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const Post: React.FC<Post> = ({
  title,
  image,
  author,
  createdAt,
  authorPhoto,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label='recipe'
            className={classes.avatar}
            alt={author}
            src={authorPhoto}
            title={author}
          />
        }
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={author}
        subheader={`${moment(createdAt).format("ll")} - ${moment(createdAt).fromNow()}`}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent className={classes.title}>
          <Typography variant='h4'>{title}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label='add to favorites'>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
