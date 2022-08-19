import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from '../../header/header';
import { SprintMain } from './sprintMain';

export const Sprint = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <SprintMain />
  </ChakraProvider>
);
