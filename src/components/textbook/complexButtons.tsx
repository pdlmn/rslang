/* eslint-disable no-nested-ternary */
import {
  Button, Flex, Text,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { setShowComplexWords, setShowLearnedWords } from './textbook.actions';
import {
  getComplexWords, getLearnedWords, getShowComplexWords, getShowLearnedWords,
} from './textbook.selectors';

export type ComplexButtonProps = {
  name: string;
  count: number;
  onClick?: () => void;
  complex: boolean;
  learned: boolean;
};

const ComplexButton = ({
  name, count, onClick, complex, learned,
}: ComplexButtonProps) => {
  const showComplexWords = useSelector(getShowComplexWords);
  const showLearnedWords = useSelector(getShowLearnedWords);
  return (
    <Button
      h="full"
      w="10rem"
      pl={0}
      flexGrow={{ base: '1', md: '0' }}
      bgColor={(showComplexWords && complex) ? 'yellow.50' : (showLearnedWords && learned) ? 'gray.50' : 'gray.100'}
      borderBottom="4px solid"
      borderBottomColor={(showComplexWords && complex) ? 'yellow.400' : (showLearnedWords && learned) ? 'gray.700' : 'transparent'}
      shadow={(showComplexWords && complex) || (showLearnedWords && learned) ? 'md' : 'none'}
      onClick={onClick}
      _hover={{ bgColor: (complex ? 'yellow.50' : 'gray.50'), borderBottomColor: (complex ? 'yellow.400' : 'gray.700') }}
      _active={{ bgColor: (complex ? 'yellow.100' : 'white') }}
    >
      <Flex direction="column" align="flex-start" p={2} gap={1}>
        <Text fontSize="lg" fontWeight="bold">{name}</Text>
        {' '}
        <Text as="i" fontSize="sm" fontWeight="300">
          слова:
          {' '}
          {count}
        </Text>
      </Flex>
    </Button>
  );
};

export const ComplexButtons = () => {
  const complexWords = useSelector(getComplexWords);
  const learnedWords = useSelector(getLearnedWords);
  const dispatch = useDispatch();
  const dispatchSetShowComplexWords = useCallback(
    (scw: boolean): AnyAction => dispatch(setShowComplexWords(scw)),
    [dispatch],
  );
  const dispatchSetShowLearnedWords = useCallback(
    (slw: boolean): AnyAction => dispatch(setShowLearnedWords(slw)),
    [dispatch],
  );

  return (
    <Flex wrap="wrap" gap="1rem" justify="flex-end">
      <ComplexButton
        name="Сложные"
        count={complexWords.length}
        complex
        learned={false}
        onClick={() => {
          dispatchSetShowComplexWords(true);
          dispatchSetShowLearnedWords(false);
        }}
      />
      <ComplexButton
        name="Изученные"
        count={learnedWords.length}
        complex={false}
        learned
        onClick={() => {
          dispatchSetShowLearnedWords(true);
          dispatchSetShowComplexWords(false);
        }}
      />
    </Flex>
  );
};
