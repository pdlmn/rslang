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
  showComplexWords: boolean;
  showLearnedWords: boolean;
  selected: boolean;
  learned: boolean;
  color?: { hoverColor: string; activeColor: string; baseColor: string };
  gray100400: string;
  gray100900: string;
};

const bgColor = ({
  showComplexWords,
  showLearnedWords,
  selected,
  learned,
  color,
  gray100400,
  gray100900,
}: BgColorParams) => {
  if (showComplexWords && selected) {
    return 'yellow.50';
  }
  if (showLearnedWords && selected) {
    return gray100400;
  }
  if (showComplexWords || showLearnedWords) {
    return 'transparent';
  }
  if (learned) {
    return gray100900;
  }
  if (selected) {
    return color?.activeColor;
  }
  return 'transparent';
};

type TextColorParams = {
  showComplexWords: boolean;
  showLearnedWords: boolean;
  selected: boolean;
  learned: boolean;
  gray800800: string;
  gray800200: string;
  gray300600: string;
  gray800400: string;
  color?: { hoverColor: string; activeColor: string; baseColor: string };
};

const textColor = ({
  showComplexWords,
  showLearnedWords,
  selected,
  learned,
  gray800800,
  gray800200,
  gray300600,
  gray800400,
}: TextColorParams) => {
  if (showLearnedWords && selected) {
    return gray800800;
  }
  if (showComplexWords && selected) {
    return gray800800;
  }
  if (showLearnedWords) {
    return gray800400;
  }
  if (learned) {
    return gray300600;
  }
  if (selected) {
    return gray800800;
  }
  return gray800200;
};

type HoverActiveBgColorParams = {
  showComplexWords: boolean;
  showLearnedWords: boolean;
  learned: boolean;
  gray100400: string;
  gray100900: string;
  color?: { hoverColor: string; activeColor: string; baseColor: string };
};

const hoverBgColor = ({
  showComplexWords,
  showLearnedWords,
  learned,
  color,
  gray100400,
  gray100900,
}: HoverActiveBgColorParams) => {
  if (showComplexWords) {
    return 'yellow.50';
  }
  if (showLearnedWords) {
    return gray100400;
  }
  if (learned) {
    return gray100900;
  }
  return color?.activeColor;
};

const activeBgColor = ({
  showComplexWords,
  showLearnedWords,
  learned,
  color,
  gray100400,
  gray100900,
}: HoverActiveBgColorParams) => {
  if (showComplexWords) {
    return 'yellow.100';
  }
  if (showLearnedWords) {
    return gray100400;
  }
  if (learned) {
    return gray100900;
  }
  return color?.baseColor;
};

type HoverTextColorParams = {
  showLearnedWords: boolean;
  learned: boolean;
  gray300600: string;
  gray800800: string;
};

const hoverActiveTextColor = ({
  showLearnedWords,
  learned,
  gray300600,
  gray800800,
}: HoverTextColorParams) => {
  if (showLearnedWords) {
    return 'gray.800';
  }
  if (learned) {
    return gray300600;
  }
  return gray800800;
};

export const Card = ({
  word,
  color,
  selected,
  complex,
  learned,
  onClick,
}: WordShortCard) => {
  const showComplexWords = useSelector(getShowComplexWords);
  const showLearnedWords = useSelector(getShowLearnedWords);
  const gray100400 = useColorModeValue('gray.100', 'gray.400');
  const gray100900 = useColorModeValue('gray.100', 'gray.900');
  const gray300600 = useColorModeValue('gray.300', 'gray.600');
  const gray800800 = useColorModeValue('gray.800', 'gray.800');
  const gray800200 = useColorModeValue('gray.800', 'gray.200');
  const gray800400 = useColorModeValue('gray.800', 'gray.400');

  return (
    <Button
      p={2}
      h={{
        base: '6rem', md: '6rem', lg: '6rem', xl: '7rem',
      }}
      w="11.5rem"
      variant="outline"
      flexGrow={1}
      color={textColor({
        showComplexWords,
        showLearnedWords,
        selected,
        learned,
        gray800800,
        gray800200,
        gray300600,
        gray800400,
      })}
      borderColor={
        showComplexWords
          ? 'yellow.400'
          : showLearnedWords
            ? 'gray.300'
            : learned
              ? 'transparent'
              : color?.activeColor
      }
      bgColor={bgColor({
        showComplexWords,
        showLearnedWords,
        selected,
        learned,
        color,
        gray100400,
        gray100900,
      })}
      borderBottom={complex ? '4px solid' : '1px solid'}
      borderBottomColor={
        showLearnedWords
          ? 'gray.300'
          : learned
            ? 'transparent'
            : complex
              ? 'yellow.400'
              : color?.activeColor
      }
      transition="all .25s ease-in-out"
      onClick={onClick}
      flexWrap="wrap"
      position="relative"
      _hover={{
        bgColor: hoverBgColor({
          showComplexWords,
          showLearnedWords,
          learned,
          color,
          gray100400,
          gray100900,
        }),
        color: hoverActiveTextColor({
          showLearnedWords,
          learned,
          gray300600,
          gray800800,
        }),
      }}
      _active={{
        bgColor: activeBgColor({
          showComplexWords,
          showLearnedWords,
          learned,
          color,
          gray100400,
          gray100900,
        }),
        color: hoverActiveTextColor({
          showLearnedWords,
          learned,
          gray300600,
          gray800800,
        }),
      }}
    >
      {' '}
      {complex ? (
        <Box position="absolute" color="yellow.400" top="2" right="2">
          <AiFillStar />
        </Box>
      ) : (
        ''
      )}
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
