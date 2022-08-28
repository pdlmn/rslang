import {
  Button, Flex, Heading, VStack,
} from '@chakra-ui/react';
import { useAction } from '../../../../../hooks/useAction';
import { Word } from '../../../../../interfaces/services';
import { useTypedSelector } from '../../../../../redux';
import { Words } from '../../../../../services/words';
import { addStatAndShuffleWords } from '../statisticsScreen/addStatAndShuffleWords';
import { levelsButtons } from './levelsButtons';
import { StartScreenBtn } from './startScreenBtn';

export const StartScreen = () => {
  const name = useTypedSelector((state) => state.games.name);
  const description = useTypedSelector((state) => state.games.description);
  const fromPage = useTypedSelector((state) => state.games.fromPage);
  const currentLevel = useTypedSelector((state) => state.games.level);
  const {
    startGame, startLoading, stopLoading, setWords,
  } = useAction();
  const levelSelector = fromPage
    ? (
      <p>
        Игра со словами со страницы учебника
        {currentLevel}
        -
        {fromPage}
      </p>
    )
    : levelsButtons.map((level) => (
      <StartScreenBtn {...level} />
    ));

  const getWordsAndStart = async () => {
    startLoading();
    const words = addStatAndShuffleWords(await Words.get() as Array<Word>);
    setWords({ words });
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
