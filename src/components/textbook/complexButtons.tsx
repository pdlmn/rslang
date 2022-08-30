import {
  Button, Flex, Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { getComplexWords, getLearnedWords } from './textbook.selectors';

export type ComplexButtonProps = {
  name: string;
  count: number;
};

const ComplexButton = ({ name, count }: ComplexButtonProps) => (
  <Button h="full" w="10rem" pl={0} flexGrow={{ base: '1', md: '0' }}>
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

export const ComplexButtons = () => {
  const complexWords = useSelector(getComplexWords);
  const learnedWords = useSelector(getLearnedWords);
  // const dispatch = useDispatch();
  // const dispatchSetComplexWord = useCallback(
  //   (cw: Word): AnyAction => dispatch(setComplexWord(cw)),
  //   [dispatch],
  // );

  return (
    <Flex wrap="wrap" gap="1rem" justify="flex-end">
      <ComplexButton name="Сложные" count={complexWords.length} />
      <ComplexButton name="Изученные" count={learnedWords.length} />
    </Flex>
  );
};
