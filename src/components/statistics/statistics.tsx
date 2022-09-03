import {
  Box, Flex,
} from '@chakra-ui/react';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { StatisticsMain } from './statisticsMain';

export const Statistics = () => (
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
);
