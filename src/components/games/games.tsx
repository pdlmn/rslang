import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from '../header/header';
import { GamesMain } from './gamesMain';

export const Games = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <GamesMain />
  </ChakraProvider>
);
