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
import { DottedBox } from './dottedBox';

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
        userSelect="none"
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
        <DottedBox height="420" left="-45px" />
        <Carousel />
      </Box>
    </Stack>
  </Container>
);
