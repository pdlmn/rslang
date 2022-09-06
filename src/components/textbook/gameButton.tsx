import {
  Button,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Text,
  Box,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getShowComplexWords,
  getShowLearnedWords,
} from './textbook.selectors';

import { useAction } from '../../hooks/useAction';

export type GameData = {
  gameMiniDescription: string;
  gameName: string;
  gameDescription: string;
  img: string;
  href: string;
  isFromTextBook: boolean;
  pageLearned?: boolean;
};

export const GameButton = ({
  pageLearned,
  gameMiniDescription,
  gameName,
  gameDescription,
  img,
  href,
  isFromTextBook,
}: GameData) => {
  const navigate = useNavigate();
  const { startFromTextbook, startFromMenu, ResetGame } = useAction();
  const routeChange = () => {
    ResetGame();
    if (isFromTextBook) {
      startFromTextbook();
    } else {
      startFromMenu();
    }
    navigate(href);
  };

  const showComplexWords = useSelector(getShowComplexWords);
  const showLearnedWords = useSelector(getShowLearnedWords);

  return (
    <Button
      maxW="30rem"
      minH={{ base: '11rem', sm: '13rem' }}
      p={4}
      justifyContent={{ base: 'center', sm: 'flex-start' }}
      alignContent={{ base: 'center', sm: 'flex-start' }}
      onClick={routeChange}
      disabled={pageLearned && !(showComplexWords || showLearnedWords)}
    >
      <Flex
        direction="column"
        justify="flex-start"
        align="flex-start"
        w={{ base: '80%', sm: '50%' }}
        h="full"
        gap={4}
      >
        <Text
          bgColor="yellow.400"
          p={0.5}
          pb={1}
          pl={2}
          pr={2}
          rounded="md"
          color={useColorModeValue('white', 'black')}
        >
          {gameMiniDescription}
        </Text>
        <Stack>
          <Heading as="h2" size="lg" textAlign="left">
            {gameName}
          </Heading>
          <Text
            as="h3"
            fontSize="lg"
            fontWeight="500"
            style={{ whiteSpace: 'normal' }}
            textAlign="left"
          >
            {gameDescription}
          </Text>
        </Stack>
      </Flex>
      <Box
        w="19rem"
        bgImage={img}
        backgroundSize="contain"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        bgColor="white"
        rounded="5rem"
        height="full"
        display={{ base: 'none', sm: 'block' }}
      />
    </Button>
  );
};
