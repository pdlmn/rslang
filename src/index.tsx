import React from 'react';
import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './redux';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <ColorModeScript />
        <Router>
          <App />
        </Router>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
);
