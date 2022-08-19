import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Box,
  Button,
} from '@chakra-ui/react';
import { Carousel } from './carousel';

const DottedBox = () => (
  <Box
    position="absolute"
    left="-45px"
    top="-30px"
    height="full"
    maxW="700px"
    zIndex={-1}
  >
    <svg
      color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
      width="500"
      height="420"
      fill="none"
    >
      <defs>
        <pattern
          id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="4" height="4" fill="currentColor" />
        </pattern>
      </defs>
      <rect
        width="404"
        height="404"
        fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
      />
    </svg>
  </Box>
);

export const Overview = () => (
  <Container maxW="container.xl" px={{ base: 6, md: 3 }} py={24}>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      justifyContent="center"
      spacing={20}
    >
      <Stack
        direction="column"
        spacing={6}
        justifyContent="center"
        maxW="450px"
      >
        <chakra.h1
          fontSize="4xl"
          lineHeight={1}
          fontWeight="bold"
          textAlign="left"
        >
          Занимайся эффективно
          {' '}
          <br />
          <chakra.span color="teal">в игре!</chakra.span>
        </chakra.h1>
        <Text
          fontSize="1.2rem"
          textAlign="left"
          lineHeight="1.375"
          fontWeight="400"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Игровая механика доказала свою эффективность для всех возрастов.
        </Text>
        <HStack
          spacing={{ base: 0, sm: 2 }}
          mb={{ base: '3rem !important', sm: 0 }}
          flexWrap="wrap"
        >
          <Button>Сотреть видео</Button>
        </HStack>
      </Stack>
      <Box ml={{ base: 0, md: 5 }} pos="relative">
        <DottedBox />
        <Carousel />
      </Box>
    </Stack>
  </Container>
);
