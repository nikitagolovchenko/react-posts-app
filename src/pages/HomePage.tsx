import React from 'react';
import Layout from './../components/Layout';
import { useSelector } from 'react-redux';
import { selectPosts } from '../features/postsSlice';
import { Box, CircularProgress } from '@material-ui/core';
import PostsList from '../components/PostsList';

const HomePage: React.FC = () => {
  const posts = useSelector(selectPosts);

  return (
    <Layout>
      {posts.loading && (
        <Box textAlign='center'>
          <CircularProgress />
        </Box>
      )}
      <PostsList posts={posts.posts}/>
    </Layout>
  );
};

export default HomePage;
