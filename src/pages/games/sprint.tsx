import { ChakraProvider, theme } from '@chakra-ui/react';
import { Header } from '../../components/header/header';
import { SprintMain } from '../../components/games/sprint/sprintMain';

export const Sprint = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <SprintMain />
  </ChakraProvider>
);
