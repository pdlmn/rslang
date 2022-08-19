import { ChakraProvider, theme } from '@chakra-ui/react';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Main } from './components/main/main';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Main />
    <Footer />
  </ChakraProvider>
);
