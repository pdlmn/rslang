import {
  Box, ChakraProvider, Flex, theme,
} from '@chakra-ui/react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { StatisticsMain } from './statisticsMain';

export const Statistics = () => (
  <ChakraProvider theme={theme}>
    <Flex
      minH="100vh"
      direction="column"
      justifyContent="space-between"
    >
      <Box>
        <Header />
        <StatisticsMain />
      </Box>
      <Footer />
    </Flex>
  </ChakraProvider>
);
