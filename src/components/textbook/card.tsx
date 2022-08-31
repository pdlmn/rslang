/* eslint-disable no-nested-ternary */
import {
  Button, useColorModeValue, Stack, Text, Box,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Word } from '../../interfaces/services';
import { getShowComplexWords, getShowLearnedWords } from './textbook.selectors';

type WordShortCard = {
  word: Word;
  color?: { hoverColor: string; activeColor: string; baseColor: string };
  selected: boolean;
  complex: boolean;
  learned: boolean;
  onClick: () => void;
};

type BgColorParams = {
  showComplexWords: boolean,
  showLearnedWords: boolean,
  selected: boolean,
  learned: boolean,
  color?: { hoverColor: string; activeColor: string; baseColor: string };
};

const bgColor = ({
  showComplexWords, showLearnedWords, selected, learned, color,
}: BgColorParams) => {
  if (showComplexWords && selected) {
    return 'yellow.50';
  }
  if (showLearnedWords && selected) {
    return 'gray.50';
  }
  if (showComplexWords || showLearnedWords) {
    return 'transparent';
  }
  if (learned) {
    return 'gray.100';
  }
  if (selected) {
    return color?.activeColor;
  }
  return 'transparent';
};

export const Card = ({
  word, color, selected, complex, learned, onClick,
}: WordShortCard) => {
  const showComplexWords = useSelector(getShowComplexWords);
  const showLearnedWords = useSelector(getShowLearnedWords);
  return (
    <Button
      p={2}
      h="7rem"
      w="11.5rem"
      variant="outline"
      color={showLearnedWords ? 'gray.800' : learned ? 'gray.300' : selected ? 'gray.800' : useColorModeValue('gray.800', 'gray.200')}
      borderColor={showComplexWords ? 'yellow.400' : showLearnedWords ? 'gray.300' : learned ? 'transparent' : color?.activeColor}
      bgColor={bgColor({
        showComplexWords, showLearnedWords, selected, learned, color,
      })}
      // bgColor={showComplexWords && selected ? 'yellow.50'
      // : showLearnedWords && selected ? 'gray.50'
      // : showComplexWords || showLearnedWords ? 'transparent'
      // : learned ? 'gray.100' : selected ? color?.activeColor : 'transparent'}
      borderBottom={complex ? '4px solid' : '1px solid'}
      borderBottomColor={showLearnedWords ? 'gray.300' : learned ? 'transparent' : complex ? 'yellow.400' : color?.activeColor}
      transition="all .25s ease-in-out"
      onClick={onClick}
      flexWrap="wrap"
      position="relative"
      _hover={{
        bgColor: showComplexWords ? 'yellow.50' : learned ? 'gray.100' : color?.activeColor,
        color: showLearnedWords ? 'gray.800' : learned ? 'gray.300' : useColorModeValue('gray.800', 'gray.800'),
      }}
      _active={{
        bgColor: showComplexWords ? 'yellow.100' : learned ? 'gray.100' : color?.baseColor,
        color: showLearnedWords ? 'gray.700' : learned ? 'gray.300' : useColorModeValue('gray.800', 'gray.800'),
      }}
    >
      {' '}
      {complex ? <Box position="absolute" color="yellow.400" top="2" right="2"><AiFillStar /></Box> : ''}
      <Stack>
        <Text fontSize="xl" fontWeight="bold">
          {word.word}
        </Text>
        <Text fontSize="md" fontWeight="300" style={{ whiteSpace: 'normal' }}>
          {word.wordTranslate}
        </Text>
      </Stack>
    </Button>
  );
};
