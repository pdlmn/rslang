import { Heading, Text, VStack } from '@chakra-ui/react';
import { useTypedSelector } from '../../../../../redux';

export const StatisticsScreen = () => {
  const { words } = useTypedSelector((state) => state.gameWords);
  const rightWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => word.isCorrect)
    .map((word) => (
      <Text key={word.id}>{`${word.word} - ${word.wordTranslate}`}</Text>
    ));
  const wrongWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => !word.isCorrect)
    .map((word) => (
      <Text key={word.id}>{`${word.word} - ${word.wordTranslate}`}</Text>
    ));
  return (
    <VStack maxH="40rem" overflow="auto">
      <Heading size="md" textAlign="center">Статистика</Heading>
      <Heading size="xs" textAlign="center">Ошибки</Heading>
      {wrongWords}
      <Heading size="xs" textAlign="center">Верные ответы</Heading>
      {rightWords}
    </VStack>
  );
};
