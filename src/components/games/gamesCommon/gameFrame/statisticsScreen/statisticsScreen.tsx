import { Heading, Text, VStack } from '@chakra-ui/react';
import { useTypedSelector } from '../../../../../redux';

export const StatisticsScreen = () => {
  const words = useTypedSelector((state) => state.gameWords.words);
  const rightWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => word.isCorrect)
    .map((word) => (
      <Text>{`${word.word} - ${word.wordTranslate}`}</Text>
    ));
  const wrongWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => !word.isCorrect)
    .map((word) => (
      <Text>{`${word.word} - ${word.wordTranslate}`}</Text>
    ));
  return (
    <VStack>
      <Heading size="md" textAlign="center">Статистика</Heading>
      <Heading size="xs" textAlign="center">Ошибки</Heading>
      {wrongWords}
      <Heading size="xs" textAlign="center">Верные ответы</Heading>
      {rightWords}
    </VStack>
  );
};
