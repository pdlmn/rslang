import {
  Flex,
  Text,
  Image,
  Button,
  HStack,
  VStack,
  Stack,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { Word } from '../../interfaces/services';
import { API_URI } from '../../services/common';
import { SoundButton } from './soundButton';
import { setComplexWord, setLearnedWord } from './textbook.actions';
import { getGroup, getSelectedWord } from './textbook.selectors';

export const WordDescriptionCard = () => {
  const group = useSelector(getGroup);
  const selectedWord = useSelector(getSelectedWord);
  const dispatch = useDispatch();
  const dispatchSetComplexWord = useCallback(
    (cw: Word): AnyAction => dispatch(setComplexWord(cw)),
    [dispatch],
  );
  const dispatchSetLearnedWord = useCallback(
    (lw: Word): AnyAction => dispatch(setLearnedWord(lw)),
    [dispatch],
  );

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
        <HStack spacing={4} pt={2} pb={2}>
          <Button colorScheme="green" lineHeight={1} onClick={() => dispatchSetComplexWord(selectedWord!)}>в сложные слова</Button>
          <Button colorScheme="red" lineHeight={1} onClick={() => dispatchSetLearnedWord(selectedWord!)}>в изученные слова</Button>
        </HStack>
        <Stack>
          <Text align="center" fontWeight="bold">
            Значение
          </Text>
          <Text
            align="left"
            dangerouslySetInnerHTML={{ __html: selectedWord?.textMeaning || '' }}
          />
          <Text>{selectedWord?.textMeaningTranslate}</Text>
          <Text align="center" fontWeight="bold">
            Пример
          </Text>
          <Text
            align="start"
            dangerouslySetInnerHTML={{ __html: selectedWord?.textExample || '' }}
          />
          <Text>{selectedWord?.textExampleTranslate}</Text>
        </Stack>
      </VStack>
    </Flex>
  );
};
