import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from '../../components/header/header';
import { GamesMain } from '../../components/games/gamesMain';

export const Games = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <GamesMain />
  </ChakraProvider>
);
