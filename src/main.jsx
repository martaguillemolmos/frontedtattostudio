import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@mantine/core/styles.css'
import './index.css'

import {BrowserRouter} from "react-router-dom"
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <MantineProvider theme={theme}>
      <App />
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
