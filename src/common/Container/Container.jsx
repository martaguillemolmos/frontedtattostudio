import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export const SimpleContainer = ({children}) => {
  return (
    <React.Fragment>
      <Container maxWidth="sm" className ="containerDesign">
        <Box sx={{    bgcolor: '#cfe8fc',
          height: '60vh',
          width: '50vw',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'whitesmoke',
          border: '0.16em solid rgb(125, 123, 123)',
          borderRadius: '0.44em',}}>
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
}