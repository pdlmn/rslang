import { Box } from '@chakra-ui/react';
import { Overview } from './overview';
import { Developers } from './developers';
import { HeroSection } from './heroSection';
import { Features } from './features';

export const Main = () => (
  <Box as="main">
    <HeroSection />
    <Features />
    <Overview />
    <Developers />
  </Box>
);
