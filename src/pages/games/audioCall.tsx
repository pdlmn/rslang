import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from '../../components/header/header';
import { AudioCallMain } from '../../components/games/audioCall/audioCallMain';

export const AudioCall = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <AudioCallMain />
  </ChakraProvider>
);
