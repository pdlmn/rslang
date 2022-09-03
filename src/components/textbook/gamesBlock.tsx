import {
  Flex, Heading, Text, Box,
} from '@chakra-ui/react';
import { DottedBox } from '../main/dottedBox';
import { GameData, GameButton } from './gameButton';

export const gameData: Array<GameData> = [
  {
    gameMiniDescription: 'Аудирование',
    gameName: 'Аудиовызов',
    gameDescription: 'Попробуй понять, какое слово было произнесено',
    img: '/assets/audio.jpg',
    href: '/audiogame',
    isFromTextBook: true,
  },
  {
    gameMiniDescription: 'Перевод на скорость',
    gameName: 'Спринт',
    gameDescription: 'Как можно быстрее определи верный перевод слова',
    img: '/assets/sprint.jpg',
    href: '/sprintgame',
    isFromTextBook: true,
  },
];

export const GamesBlock = () => (
  <Flex direction="column" pt={6}>
    <Heading as="h2" size="lg" userSelect="none">
      Игры
    </Heading>
    <Text as="h3" fontSize="lg" fontWeight="500" userSelect="none">
      Закрепи новые слова при помощи игр
    </Text>
    <Flex gap={8} pt={10} justify="space-around">
      {gameData.map((el) => (
        <Box position="relative" key={el.gameName}>
          <DottedBox height="270" left="-62px" />
          <GameButton {...el} />
        </Box>
      ))}
    </Flex>
  </Flex>
);
