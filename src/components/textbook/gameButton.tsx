import {
  Button, Flex, useColorModeValue, Stack, Heading, Text, Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export type GameData = {
  gameMiniDescription: string;
  gameName: string;
  gameDescription: string;
  img: string;
  href: string;
};

export const GameButton = ({
  gameMiniDescription,
  gameName,
  gameDescription,
  img,
  href,
}: GameData) => {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate(href);
  };

  return (
    <Button
      w="30rem"
      h="13rem"
      p={4}
      justifyContent="flex-start"
      alignContent="flex-start"
      onClick={routeChange}
    >
      <Flex
        direction="column"
        justify="flex-start"
        align="flex-start"
        w="50%"
        h="full"
        gap={4}
      >
        <Text
          bgColor="yellow.400"
          p={1}
          pl={2}
          pr={2}
          rounded="3xl"
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
      />
    </Button>
  );
};
