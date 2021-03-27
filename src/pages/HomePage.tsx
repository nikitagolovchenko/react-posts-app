import React from 'react';
import Layout from './../components/Layout';
import { useSelector } from 'react-redux';
import { selectPosts } from '../features/postsSlice';
import { Box, CircularProgress } from '@material-ui/core';
import Post from '../components/Post';

const HomePage: React.FC = () => {
  const posts = useSelector(selectPosts);

  return (
    <Layout>
      {posts.loading && (
        <Box textAlign='center'>
          <CircularProgress />
        </Box>
      )}
      {posts.posts.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </Layout>
  );
};

export default HomePage;
