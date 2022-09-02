import {
  Flex,
  Heading, HStack, Text,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../../../redux';
import { SoundBtn } from './soundBtn';

export const StatisticsScreen = () => {
  const { words } = useTypedSelector((state) => state.gameWords);
  const rightWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => word.isCorrect);
  const wrongWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => !word.isCorrect);
  return (
    <Flex gap={10} mb="auto">
      <Flex direction="column" alignItems="flex-start" justify="flex-start" h="100%">
        <Heading size="sm" borderBottom="2px solid green" alignSelf="center">
          Правильно
        </Heading>
        {rightWords.map((word) => (
          <HStack key={word.id}>
            <SoundBtn audio={word.audio} />
            <Text>{`${word.word} - ${word.wordTranslate}`}</Text>
          </HStack>
        ))}
      </Flex>
      <Flex direction="column" alignItems="flex-start" justifyContent="start">
        <Heading size="sm" borderBottom="2px solid red" alignSelf="center">
          Неправильно
        </Heading>
        {wrongWords
          .map((word) => (
            <HStack key={word.id}>
              <SoundBtn audio={word.audio} />
              <Text>{`${word.word} - ${word.wordTranslate}`}</Text>
            </HStack>
          ))}
      </Flex>
    </Flex>
  );
};
