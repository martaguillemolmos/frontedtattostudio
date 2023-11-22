import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from '@mui/material/CssBaseline';
import "@mantine/core/styles.css";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";

//REDUX

import { Provider } from "react-redux";
import store from "./app/store.js";

//REDUX PERSISTENCE

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ThemeProvider } from "@mui/material";

const persistor = persistStore(store);

//Mantine
const theme = createTheme({
  /** Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MantineProvider theme={theme}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <App />
            </ThemeProvider>
          </MantineProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
