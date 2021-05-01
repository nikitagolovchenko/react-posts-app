import { Grid } from '@material-ui/core'
import React from 'react'
import Post from './Post'

interface PostsListProps {
  posts: Post[]
}

const PostsList: React.FC<PostsListProps> = ({posts}) => {
  return (
    <Grid container spacing={5}>
      {posts.map((post, index) => (
        <Grid item xs={6} key={index}>
          <Post {...post} />
        </Grid>
      ))}
    </Grid>
  )
}

export default PostsList
