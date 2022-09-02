import {
  Button, Flex, Heading, VStack,
} from '@chakra-ui/react';
import { useAction } from '../../../../../hooks/useAction';
import { useTypedSelector } from '../../../../../redux';
import { levelsButtons } from './levelsButtons';
import { StartScreenBtn } from './startScreenBtn';
import { loadWords } from './utils';

export const StartScreen = () => {
  const { user } = useTypedSelector((state) => state.auth);
  const {
    name, description, fromTextbook, level,
  } = useTypedSelector((state) => state.games);
  const { page } = useTypedSelector((state) => state.textbook);
  const { grade } = useTypedSelector((state) => state.textbook.group);
  const {
    startGame, startLoading, stopLoading, setWords, showError,
  } = useAction();
  const levelSelector = fromTextbook
    ? (
      <p>
        {`Игра со словами из раздела ${grade} страница ${page}`}
      </p>
    )
    : levelsButtons.map((levelBtn) => (
      <StartScreenBtn {...levelBtn} />
    ));

  const getWordsAndStart = async () => {
    startLoading();
    try {
      const words = await (fromTextbook
        ? loadWords({ grade, user, page })
        : loadWords({ grade: level, user }));
      setWords({ words });
    } catch (error) {
      if (error instanceof Error) {
        showError({ error });
        return;
      }
    }
    stopLoading();
    startGame();
  };

  return (
    <VStack spacing="50px">
      <Heading as="h1">{name}</Heading>
      <Heading size="md" textAlign="center">{description}</Heading>
      <Flex gap="50px">
        {levelSelector}
      </Flex>
      <Button
        display={{ base: 'none', md: 'inline-flex' }}
        fontSize="md"
        fontWeight={600}
        color="white"
        bg="green.600"
        _hover={{
          bg: 'green.500',
        }}
        onClick={() => { getWordsAndStart(); }}
      >
        Начать игру
      </Button>
    </VStack>
  );
};
