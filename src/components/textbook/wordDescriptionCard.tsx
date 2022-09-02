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
    [dispatch],
  );
  const dispatchSetLearnedWord = useCallback(
    (lw: Word): AnyAction => dispatch(setLearnedWord(lw)),
    [dispatch],
  );
  const dispatchRemoveComplexWord = useCallback(
    (cw: Word): AnyAction => dispatch(removeComplexWord(cw)),
    [dispatch],
  );
  const dispatchRemoveLearnedWord = useCallback(
    (cw: Word): AnyAction => dispatch(removeLearnedWord(cw)),
    [dispatch],
  );

  const handleComplexBtnClick = () => {
    if (showComplexWords) {
      return dispatchRemoveComplexWord(selectedWord!);
    }
    if (showLearnedWords) {
      return (
        dispatchRemoveLearnedWord(selectedWord!),
        dispatchSetComplexWord(selectedWord!)
      );
    }
    if (learnedWords.some((el) => el.id === selectedWord!.id)) {
      return (
        dispatchRemoveLearnedWord(selectedWord!),
        dispatchSetComplexWord(selectedWord!)
      );
    }
    return dispatchSetComplexWord(selectedWord!);
  };

  const handleLearnedBtnClick = () => {
    if (showLearnedWords) {
      return dispatchRemoveLearnedWord(selectedWord!);
    }
    if (showComplexWords) {
      return (
        dispatchRemoveComplexWord(selectedWord!),
        dispatchSetLearnedWord(selectedWord!)
      );
    }
    if (complexWords.some((el) => el.id === selectedWord!.id)) {
      return (
        dispatchRemoveComplexWord(selectedWord!),
        dispatchSetLearnedWord(selectedWord!)
      );
    }
    return dispatchSetLearnedWord(selectedWord!);
  };

  const iconStyles = { fontSize: '1.5em' };
  const { user } = useTypedSelector((state) => state.auth);

  return (
    <Flex
      w="400px"
      border="1px solid"
      borderColor={`${group?.color.baseColor.split('.')[0]}.200`}
      direction="column"
      rounded="md"
    >
      <Image
        w="400px"
        h="230px"
        objectFit="cover"
        src={`${API_URI}/${selectedWord?.image}`}
        alt={selectedWord?.word}
        roundedTop="md"
      />
      <VStack p={4}>
        <Text fontSize="3xl" fontWeight="bold">
          {selectedWord?.word}
        </Text>
        <Text fontSize="xl" fontWeight="500">
          {selectedWord?.wordTranslate}
        </Text>
        <HStack>
          <Text fontSize="xl" fontWeight="500">
            {selectedWord?.transcription}
          </Text>
          {selectedWord && <SoundButton />}
        </HStack>
        {user && (
          <HStack spacing={4} pt={2} pb={2}>
            <Button
              colorScheme={showComplexWords ? 'yellow' : 'green'}
              lineHeight={1}
              minW="11rem"
              onClick={() => handleComplexBtnClick()}
            >
              {showComplexWords ? 'в учебник' : 'в сложные слова'}
            </Button>
            <Button
              colorScheme={showLearnedWords ? 'yellow' : 'red'}
              lineHeight={1}
              minW="11rem"
              onClick={() => handleLearnedBtnClick()}
            >
              {showLearnedWords ? 'в учебник' : 'в изученные слова'}
            </Button>
          </HStack>
        )}
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
          <Flex direction="column" pt={2} gap={3} w="100%">
            <HStack justifyContent="center">
              <Text as="h4" fontSize="xl" fontWeight="500" userSelect="none">
                Ответы в играх
              </Text>
              <BsCheckAll style={iconStyles} />
            </HStack>

            <Flex justifyContent="space-around">
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
                  color={useColorModeValue('white', 'gray.100')}
                >
                  Аудиовызов
                </Text>
                <Text pl={3} fontSize="1.1rem" userSelect="none">
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
                  color={useColorModeValue('white', 'gray.100')}
                >
                  Спринт
                </Text>
                <Text pl={3} fontSize="1.1rem" userSelect="none">
                  0
                </Text>
              </HStack>
            </Flex>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
};
