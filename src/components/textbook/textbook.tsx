import {
  Box, ChakraProvider, Flex, theme,
} from '@chakra-ui/react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { TextbookMain } from './textbookMain';

export const Textbook = () => (
  <ChakraProvider theme={theme}>
    <Flex minH="100vh" direction="column" justifyContent="space-between" gap={10}>
      <Box>
        <Header />
        <TextbookMain />
      </Box>
      <Footer />
    </Flex>
  </ChakraProvider>
);
