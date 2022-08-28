import {
  Flex, Heading, Text, Box,
} from '@chakra-ui/react';
import { DottedBox } from '../main/dottedBox';
import { GameData, GameButton } from './gameButton';

const gameData: Array<GameData> = [
  {
    gameMiniDescription: 'Аудирование',
    gameName: 'Аудиовызов',
    gameDescription: 'Попробуй понять, какое слово было произнесено',
    img: '/assets/audio.jpg',
    href: '/audiogame',
  },
  {
    gameMiniDescription: 'Перевод на скорость',
    gameName: 'Спринт',
    gameDescription: 'Как можно быстрее определи верный перевод слова',
    img: '/assets/sprint.jpg',
    href: '/sprintgame',
  },
];

export const GamesBlock = () => (
  <Flex direction="column" pt={8}>
    <Heading as="h2" size="lg">
      Игры
    </Heading>
    <Text as="h3" fontSize="lg" fontWeight="500">
      Закрепи новые слова при помощи игр
    </Text>
    <Flex gap={8} pt={10} justify="space-around">
      {gameData.map((el) => (
        <Box position="relative">
          <DottedBox height="270" left="-62px" />
          <GameButton {...el} />
        </Box>
      ))}
    </Flex>
  </Flex>
);
