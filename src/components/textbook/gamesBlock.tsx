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
  <Flex direction="column" pt={{base: 2, sm: 6}}>
    <Heading as="h2" size="lg" userSelect="none">
      Игры
    </Heading>
    <Text as="h3" fontSize="lg" fontWeight="500" userSelect="none">
      Закрепи новые слова при помощи игр
    </Text>
    <Flex gap={{base: 6, sm: 8}} pt={{base: 3, sm: 10}} justify="space-around" wrap="wrap">
      {gameData.map((el) => (
        <Box position="relative" key={el.gameName}>
          <DottedBox height="270" left="-62px" />
          <GameButton {...el} />
        </Box>
      ))}
    </Flex>
  </Flex>
);
