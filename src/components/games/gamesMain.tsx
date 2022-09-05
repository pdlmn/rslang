import {
  Box,
  Container, Flex, Heading, VStack,
} from '@chakra-ui/react';
import { DottedBox } from '../main/dottedBox';
import { GameButton } from '../textbook/gameButton';
import { gameData } from '../textbook/gamesBlock';

const gamesData = gameData.map((game) => ({ ...game, isFromTextBook: false }));

export const GamesMain = () => (
  <Container maxW="container.xl" p="2rem 1rem">
    <VStack spacing={24}>
      <Heading as="h1">Мини-игры</Heading>

      <Flex gap={{ base: 6, sm: 8 }} pt={{ base: 3, sm: 10 }} justify="space-around" wrap="wrap">
        {gamesData.map((game) => (
          <Box position="relative" key={game.gameName}>
            <DottedBox height="270" left="-62px" />
            <GameButton {...game} />
          </Box>
        ))}
      </Flex>
    </VStack>
  </Container>
);
