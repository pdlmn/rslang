import {
  Button, useColorModeValue, Stack, Text,
} from '@chakra-ui/react';
import { Word } from '../../interfaces/services';

type WordShortCard = {
  word: Word;
  color: { hoverColor: string; activeColor: string; baseColor: string };
  selected: boolean;
  onClick: () => void;
};

export const Card = ({
  word, color, selected, onClick,
}: WordShortCard) => (
  <Button
    p={2}
    h="7rem"
    w="11.5rem"
    variant="outline"
    color={selected ? 'gray.800' : useColorModeValue('gray.700', 'gray.200')}
    borderColor={color.activeColor}
    bgColor={selected ? color.activeColor : 'transparent'}
    transition="all .25s ease-in-out"
    onClick={onClick}
    flexWrap="wrap"
    _hover={{
      bgColor: color.activeColor,
      color: useColorModeValue('gray.800', 'gray.800'),
    }}
    _active={{
      bgColor: color.baseColor,
      color: useColorModeValue('gray.800', 'gray.800'),
    }}
  >
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
