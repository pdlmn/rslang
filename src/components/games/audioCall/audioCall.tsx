import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from '../../header/header';
import { AudioCallMain } from './audioCallMain';

export const AudioCall = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <AudioCallMain />
  </ChakraProvider>
);
