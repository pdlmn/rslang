import {
  chakra, Stack, Text, Button, VStack, Heading, useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();
  const routeChange = () => {
    navigate('/textbook');
  };
  return (
    <Stack
      bgImage={{
        base: `${process.env.PUBLIC_URL}/assets/london2.jpg`,
        md: `${process.env.PUBLIC_URL}/assets/london2.jpg`,
      }}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      minH={{ base: 'unset', md: '60vh' }}
    >
      <VStack
        userSelect="none"
        bg="whiteAlpha.800"
        p={{ base: '2', md: '6' }}
        w={{ base: 'auto', md: 'xl' }}
        rounded="md"
        alignSelf="center"
        zIndex={2}
        mt={{ base: '2', md: '6' }}
        ml={{ base: '10', md: '44' }}
      >
        <Heading
          as="h1"
          color={useColorModeValue('gray.800', 'gray.800')}
          fontSize={{ base: '2xl', md: '5xl' }}
          fontWeight="bold"
          textAlign="center"
          maxW={{ base: '250px', md: '600px' }}
        >
          Изучай английский
          {' '}
          <chakra.span
            color="teal"
            bg="linear-gradient(transparent 50%, #83e9e7 50%)"
          >
            онлайн
          </chakra.span>
        </Heading>
        <Text maxW={{ base: '200px', md: '550px' }} fontSize={{ base: 'md', md: 'xl' }} textAlign="center" color="gray.600">
          RS Lang - это эффективный сервис для увлекательного изучения
          Английского языка. Присоединяйся!
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          w={{ base: '100%', sm: 'auto' }}
          spacing={5}
        >
          <Button
            border="1px solid"
            borderColor="teal.600"
            background="transparent"
            color="teal.600"
            rounded="md"
            size={{ base: 'sm', md: 'lg' }}
            fontSize={{ base: 'sm', md: 'lg' }}
            _hover={{ bg: 'teal.50' }}
            onClick={routeChange}
          >
            Начать заниматься
          </Button>
        </Stack>
      </VStack>
    </Stack>
  );
};
