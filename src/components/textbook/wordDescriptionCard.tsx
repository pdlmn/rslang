import { Flex, Text } from '@chakra-ui/react';
import { Word } from '../../interfaces/types';

export type WordDescriptionCardProps = {
  selectedWord?: Word;
};

export const WordDescriptionCard = ({ selectedWord }: WordDescriptionCardProps) => (
  <Flex w="400px" h="2xl" border="1px solid" borderColor="gray.300">
    <Text>{selectedWord?.word}</Text>
  </Flex>
);
