import {
  Button, Flex, Heading, StackDivider, VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../redux';

export const SprintGame = () => {
  const words = useTypedSelector((state) => state.gameWords.words);
  const currentWord = useTypedSelector((state) => state.gameWords.currentWordIndex);
  const {
    nextWord, rightAnswer, wrongAnswer, finishGame,
  } = useAction();
  const { startLoading, stopLoading } = useAction();

  useEffect(() => {
    if (currentWord >= 10) {
      startLoading();
      setTimeout(() => {
        finishGame();
        stopLoading();
      }, 2000);
    }
  }, [currentWord]);

  return (
    <VStack
      divider={<StackDivider borderColor="gray.350" />}
      spacing={8}
    >
      <Heading size="md" textAlign="center">Эта версия игры создана для проверки контейнера для игр, после 10 слов игра закончится, затем 2 сек загрузка, затем окно статистики</Heading>
      <Heading size="md" textAlign="center">
        {`${words[currentWord].word} - это ${words[currentWord].wordTranslate}?`}
      </Heading>
      <Flex gap="50px">
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize="md"
          fontWeight={600}
          color="white"
          bg="red.600"
          _hover={{
            bg: 'red.500',
          }}
          onClick={() => {
            wrongAnswer();
            nextWord();
          }}
        >
          Неверно
        </Button>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize="md"
          fontWeight={600}
          color="white"
          bg="green.600"
          _hover={{
            bg: 'green.500',
          }}
          onClick={() => {
            rightAnswer();
            nextWord();
          }}
        >
          Верно
        </Button>
      </Flex>
    </VStack>
  );
};
