import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { Textbook } from './components/textbook/textbook';
import { Statistics } from './components/statistics/statistics';
import { Sprint } from './components/games/sprint/sprint';
import { AudioCall } from './components/games/audioCall/audioCall';
import { Games } from './components/games/games';
import { store } from './redux';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="textbook" element={<Textbook />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="sprintgame" element={<Sprint />} />
          <Route path="audiogame" element={<AudioCall />} />
          <Route path="games" element={<Games />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
