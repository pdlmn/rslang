/* eslint-disable no-nested-ternary */
import {
  Button, useColorModeValue, Stack, Text, Box,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import { Word } from '../../interfaces/services';

type WordShortCard = {
  word: Word;
  color: { hoverColor: string; activeColor: string; baseColor: string };
  selected: boolean;
  complex: boolean;
  learned: boolean;
  onClick: () => void;
};

export const Card = ({
  word, color, selected, complex, learned, onClick,
}: WordShortCard) => (
  <Button
    p={2}
    h="7rem"
    w="11.5rem"
    variant="outline"
    color={learned ? 'gray.300' : selected ? 'gray.800' : useColorModeValue('gray.700', 'gray.200')}
    borderColor={learned ? 'transparent' : color.activeColor}
    bgColor={learned ? 'gray.100' : selected ? color.activeColor : 'transparent'}
    borderBottom={complex ? '4px solid' : '1px solid'}
    borderBottomColor={learned ? 'transparent' : complex ? 'yellow.400' : color.activeColor}
    transition="all .25s ease-in-out"
    onClick={onClick}
    flexWrap="wrap"
    position="relative"
    _hover={{
      bgColor: learned ? 'gray.100' : color.activeColor,
      color: learned ? 'gray.300' : useColorModeValue('gray.800', 'gray.800'),
    }}
    _active={{
      bgColor: learned ? 'gray.100' : color.baseColor,
      color: learned ? 'gray.300' : useColorModeValue('gray.800', 'gray.800'),
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
