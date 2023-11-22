import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMediaQuery, useTheme } from '@mui/material';

export const SimpleContainer = ({children}) => {
  const theme = useTheme();
  useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <React.Fragment className="allContainer">
      <Container maxWidth="sm" className ="containerDesign">
        <Box sx={{    bgcolor: '#cfe8fc',
          height: '58vh',
          width: '40vw',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'whitesmoke',
          border: '0.16em solid rgb(125, 123, 123)',
          borderRadius: '0.44em',
          [theme.breakpoints.up('sm')]: {
            width: '35vw', 
          },
          [theme.breakpoints.up('md')]: {
            width: '40vw', 
          },
          [theme.breakpoints.up('lg')]: {
            width: '30vw', 
          },
          [theme.breakpoints.up('xl')]: {
            width: '25vw',
          },
          }}>
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
}