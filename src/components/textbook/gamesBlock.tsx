import {
  Flex, Heading, Text, Box,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { DottedBox } from '../main/dottedBox';
import { GameData, GameButton } from './gameButton';
import { getCurrentPageWords, getComplexWords, getLearnedWords } from './textbook.selectors';

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

export const GamesBlock = () => {
  const currentPageWords = useSelector(getCurrentPageWords);
  const complexWords = useSelector(getComplexWords);
  const learnedWords = useSelector(getLearnedWords);
  const pageLearned = useMemo(
    () => currentPageWords.every(
      (w) => complexWords.find((cw) => w.id === cw.id)
          || learnedWords.find((lw) => w.id === lw.id),
    ),
    [complexWords, learnedWords, currentPageWords],
  );

  return (
    <Flex direction="column" pt={{ base: 2, sm: 6 }}>
      <Heading as="h2" size="lg" userSelect="none">
        Игры
      </Heading>
      <Text as="h3" fontSize="lg" fontWeight="500" userSelect="none">
        Закрепи новые слова при помощи игр
      </Text>
      <Flex gap={{ base: 6, sm: 8 }} pt={{ base: 3, sm: 10 }} justify="space-around" wrap="wrap">
        {gameData.map((el) => (
          <Box position="relative" key={el.gameName}>
            <DottedBox height="270" left="-62px" />
            <GameButton pageLearned={pageLearned} {...el} />
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};
