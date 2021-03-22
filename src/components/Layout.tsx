import { Box, CssBaseline, Container } from '@material-ui/core';
import React from 'react';
import Header from './Header';

const Layout: React.FC = ({ children }) => {
  return (
    <Box width='100%' position='relative' overflow='hidden'>
      <CssBaseline />
      <Header />
      <Container maxWidth='md'>
        <Box component='main' pt={3} pb={6}>{children}</Box>
      </Container>
    </Box>
  );
};

export default Layout;
