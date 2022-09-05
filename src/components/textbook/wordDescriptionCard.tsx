import {
  Flex,
  Text,
  Image,
  Button,
  HStack,
  VStack,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { BsCheckAll } from 'react-icons/bs';
import { Word } from '../../interfaces/services';
import { API_URI } from '../../services/common';
import { SoundButton } from './soundButton';
import {
  removeComplexWord,
  removeLearnedWord,
  setComplexWord,
  setLearnedWord,
} from './textbook.actions';
import {
  getComplexWords,
  getGroup,
  getLearnedWords,
  getSelectedWord,
  getShowComplexWords,
  getShowLearnedWords,
} from './textbook.selectors';
import { useTypedSelector } from '../../redux';
import {
  addToComplex,
  addToLearned,
  removeFromComplex,
  removeFromLearned,
} from '../../services/utilsFuncs';

export const WordDescriptionCard = () => {
  const group = useSelector(getGroup);
  const selectedWord = useSelector(getSelectedWord);
  const complexWords = useSelector(getComplexWords);
  const learnedWords = useSelector(getLearnedWords);
  const showComplexWords = useSelector(getShowComplexWords);
  const showLearnedWords = useSelector(getShowLearnedWords);
  const dispatch = useDispatch();
  const dispatchSetComplexWord = useCallback(
    (cw: Word): AnyAction => dispatch(setComplexWord(cw)),
    [dispatch]
  );
  const dispatchSetLearnedWord = useCallback(
    (lw: Word): AnyAction => dispatch(setLearnedWord(lw)),
    [dispatch]
  );
  const dispatchRemoveComplexWord = useCallback(
    (cw: Word): AnyAction => dispatch(removeComplexWord(cw)),
    [dispatch]
  );
  const dispatchRemoveLearnedWord = useCallback(
    (cw: Word): AnyAction => dispatch(removeLearnedWord(cw)),
    [dispatch]
  );

  const whiteGray100 = useColorModeValue('white', 'gray.100');

  const { user } = useTypedSelector((state) => state.auth);

  const handleComplexBtnClick = () => {
    if (selectedWord) {
      if (showComplexWords) {
        return (
          dispatchRemoveComplexWord(selectedWord!),
          // удалить из userWords -> в учебник
          removeFromComplex({ selectedWord, user })
        );
      }
      if (showLearnedWords) {
        return (
          dispatchRemoveLearnedWord(selectedWord!),
          dispatchSetComplexWord(selectedWord!),
          // удалить из learned -> в сложные слова (вкладка Изученные)
          // { difficulty: 'hard', optional: { learned: false } }
          addToComplex({ selectedWord, user })
        );
      }
      if (learnedWords.some((el) => el.id === selectedWord!.id)) {
        return (
          dispatchRemoveLearnedWord(selectedWord!),
          dispatchSetComplexWord(selectedWord!),
          // удалить из learned -> в сложные слова (основные группы)
          // { difficulty: 'hard', optional: { learned: false } }
          addToComplex({ selectedWord, user })
        );
      }

      return (
        dispatchSetComplexWord(selectedWord!),
        // добавить в сложные слова (основные группы)
        // { difficulty: 'hard', optional: { learned: false } }
        addToComplex({ selectedWord, user })
      );
    }

    return null;
  };

  const handleLearnedBtnClick = () => {
    if (selectedWord) {
      if (showLearnedWords) {
        return (
          dispatchRemoveLearnedWord(selectedWord!),
          // удалить из learnedWords -> в учебник (вкладка Изученные)
          removeFromLearned({ selectedWord, user })
        );
      }
      if (showComplexWords) {
        return (
          dispatchRemoveComplexWord(selectedWord!),
          dispatchSetLearnedWord(selectedWord!),
          // удалить из complex -> в изученные слова (вкладка Сложные)
          // { difficulty: 'easy', optional: { learned: true } }
          addToLearned({ selectedWord, user })
        );
      }
      if (complexWords.some((el) => el.id === selectedWord!.id)) {
        return (
          dispatchRemoveComplexWord(selectedWord!),
          dispatchSetLearnedWord(selectedWord!),
          // удалить из complex -> в изученные слова (основные группы)
          // { difficulty: 'easy', optional: { learned: true } }
          addToLearned({ selectedWord, user })
        );
      }
      return (
        dispatchSetLearnedWord(selectedWord!),
        // добавить в изученные слова (основные группы)
        // { difficulty: 'easy', optional: { learned: true } }
        addToLearned({ selectedWord, user })
      );
    }

    return null;
  };

  const iconStyles = { fontSize: '1.5em' };

  return (
    <div>
      <Flex
        w={{ base: 'full', sm: 'full', md: 'full', lg: '400px' }}
        border="1px solid"
        borderColor={`${group?.color.baseColor.split('.')[0]}.200`}
        direction={{ base: 'column', md: 'row', lg: 'column' }}
        rounded="md"
        flexGrow={1}
      >
        <VStack>
          <Image
             w={{ base: 'full', sm: 'full', md: 'full', lg: '400px' }}
            h="220px"
            alignSelf="center"
            objectFit="cover"
            src={`${API_URI}/${selectedWord?.image}`}
            alt={selectedWord?.word}
            roundedTop="md"
          />
          <VStack p={4} pt={{base: 0, lg: 2}}>
            <Text fontSize="3xl" fontWeight="bold">
              {selectedWord?.word}
            </Text>
            <Text fontSize="xl" fontWeight="500" mt="3px !important">
              {selectedWord?.wordTranslate}
            </Text>
            <HStack mt="5px !important">
              <Text fontSize="xl" fontWeight="500">
                {selectedWord?.transcription}
              </Text>
              {selectedWord && <SoundButton />}
            </HStack>
            {user && (
              <Flex gap={4} pt={2} wrap={{base: 'wrap', sm: 'nowrap'}} justifyContent='center'>
                <Button
                  colorScheme={showComplexWords ? 'yellow' : 'green'}
                  lineHeight={1}
                  minW="11rem"
                  onClick={() => {
                    handleComplexBtnClick();
                  }}
                >
                  {showComplexWords ? 'в учебник' : 'в сложные слова'}
                </Button>
                <Button
                  colorScheme={showLearnedWords ? 'yellow' : 'red'}
                  lineHeight={1}
                  minW="11rem"
                  onClick={() => {
                    handleLearnedBtnClick();
                  }}
                >
                  {showLearnedWords ? 'в учебник' : 'в изученные слова'}
                </Button>
              </Flex>
            )}
          </VStack>
        </VStack>
        <VStack p={4} pt={2}>
          <Stack pt={1}>
            <Text align="left" fontWeight="bold">
              Значение
            </Text>
            <Text
              align="left"
              dangerouslySetInnerHTML={{
                __html: selectedWord?.textMeaning || '',
              }}
            />
            <Text>{selectedWord?.textMeaningTranslate}</Text>
            <Text align="left" fontWeight="bold">
              Пример
            </Text>
            <Text
              align="start"
              dangerouslySetInnerHTML={{
                __html: selectedWord?.textExample || '',
              }}
            />
            <Text>{selectedWord?.textExampleTranslate}</Text>
          </Stack>
          {user && (
            <Flex direction="column" gap={3} w="100%">
              <HStack justifyContent="center">
                <Text as="h4" fontSize="xl" fontWeight="500" userSelect="none">
                  Ответы в играх
                </Text>
                <BsCheckAll style={iconStyles} />
              </HStack>

              <Flex gap={{base: 2, sm: 8}} justifyContent="center" wrap='wrap'>
                <HStack>
                  <Text
                    userSelect="none"
                    fontWeight="500"
                    bgColor="gray.700"
                    p={1}
                    pb={1.5}
                    pl={3}
                    pr={3}
                    rounded="3xl"
                    color={whiteGray100}
                  >
                    Аудиовызов
                  </Text>
                  <Text
                    pl={3}
                    fontSize="1.1rem"
                    userSelect="none"
                    color="green.400"
                  >
                    0
                  </Text>
                  <Text
                    pl={3}
                    fontSize="1.1rem"
                    userSelect="none"
                    color="red.400"
                  >
                    0
                  </Text>
                </HStack>
                <HStack>
                  <Text
                    userSelect="none"
                    fontWeight="500"
                    bgColor="gray.700"
                    p={1}
                    pb={1.5}
                    pl={3}
                    pr={3}
                    rounded="3xl"
                    color={whiteGray100}
                  >
                    Спринт
                  </Text>
                  <Text
                    pl={3}
                    fontSize="1.1rem"
                    userSelect="none"
                    color="green.400"
                  >
                    0
                  </Text>
                  <Text
                    pl={3}
                    fontSize="1.1rem"
                    userSelect="none"
                    color="red.400"
                  >
                    0
                  </Text>
                </HStack>
              </Flex>
            </Flex>
          )}
        </VStack>
      </Flex>
    </div>
  );
};
