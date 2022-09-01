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
  <Container maxW="container.xl" px={{ base: 6, md: 4 }} py={24}>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      justifyContent="space-between"
    >
      <Stack
        direction="column"
        spacing={6}
        justifyContent="center"
        maxW="500px"
      >
        <chakra.h1
          fontSize="4xl"
          lineHeight={1.3}
          fontWeight="bold"
          textAlign="left"
        >
          RS Lang - это лучший способ изучить
          {' '}
          <br />
          <chakra.span color="teal">английский язык!</chakra.span>
        </chakra.h1>
        <Text
          fontSize="1.2rem"
          textAlign="left"
          lineHeight="1.375"
          fontWeight="400"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Учи слова эффективно с помощью интерактивных карточек
          и запоминай их надолго благодаря повторениям с помощью мини-игр!
          Отслеживай свои успехи!
        </Text>
        <HStack
          spacing={{ base: 0, sm: 2 }}
          mb={{ base: '3rem !important', sm: 0 }}
          flexWrap="wrap"
        >
          <Button>Смотреть видео</Button>
        </HStack>
      </Stack>
      <Box ml={{ base: 0, md: 5 }} pos="relative">
        <DottedBox height="420" left="-45px" />
        <Carousel />
      </Box>
    </Stack>
  </Container>
);
