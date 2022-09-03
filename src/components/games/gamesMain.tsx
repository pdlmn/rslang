import {
  Box,
  Container, Heading, HStack, VStack,
} from '@chakra-ui/react';
import { DottedBox } from '../main/dottedBox';
import { GameButton } from '../textbook/gameButton';
import { gameData } from '../textbook/gamesBlock';

const gamesData = gameData.map((game) => ({ ...game, isFromTextBook: false }));

export const GamesMain = () => (
  <Container maxW="container.xl" p="2rem 1rem">
    <VStack spacing={24}>
      <Heading as="h1">Мини-игры</Heading>

      <HStack spacing={24}>
        {gamesData.map((game) => (
          <Box position="relative" key={game.gameName}>
            <DottedBox height="270" left="-62px" />
            <GameButton {...game} />
          </Box>
        ))}
      </HStack>
    </VStack>
  </Container>
);
