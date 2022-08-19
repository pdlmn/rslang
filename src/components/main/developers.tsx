import {
  Container,
  Text,
  VStack,
  Stack,
  Avatar,
  Icon,
  useColorModeValue,
  Heading,
  HStack,
  chakra,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import {
  FaBicycle, FaCamera, FaDrum, FaGithub,
} from 'react-icons/fa';

const GithubButton = (props: any) => (
  <chakra.button
    {...props}
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded="full"
    w={8}
    h={8}
    cursor="pointer"
    as="a"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    transition="background 0.3s ease"
    _hover={{
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    }}
  />
);

interface DeveloperCardProps {
  icon: IconType;
  name: string;
  gitLink: string;
  position: string;
  photo: string;
  text: string;
  prop?: any;
}

const DeveloperCard = ({
  icon,
  name,
  gitLink,
  position,
  photo,
  text,
  prop,
}: DeveloperCardProps) => (
  <Container maxW="5xl" p={{ base: 4, md: 4 }}>
    <VStack
      p={4}
      bg={useColorModeValue('white', 'blackAlpha.600')}
      border="3px solid"
      borderColor="yellow.400"
      maxW="xl"
      boxShadow="lg"
      pos="relative"
      {...prop}
    >
      <Icon
        as={icon}
        w={10}
        h={10}
        color="yellow.400"
        left="-1.3rem"
        position="absolute"
        top="-1.5rem"
      />
      <Stack direction="column" spacing={5}>
        <Text color={useColorModeValue('gray.600', 'gray.300')}>{text}</Text>

        <Stack>
          <HStack alignSelf="end" mr="3rem !important">
            <GithubButton label="Github" href={gitLink}>
              <FaGithub />
            </GithubButton>
            <Text fontWeight="bold" fontSize="lg">
              {name}
            </Text>
          </HStack>

          <Text
            fontSize="md"
            color="gray.500"
            align="right"
            mr="3rem !important"
            mt="0.2rem !important"
          >
            {position}
          </Text>
        </Stack>
      </Stack>
      <Avatar
        name="avatar"
        src={photo}
        showBorder
        borderColor="yellow.400"
        size="xl"
        pos="absolute"
        right="-48px"
        bottom="-20px"
        shadow="lg"
      />
    </VStack>
  </Container>
);

export const Developers = () => (
  <Container maxW="container.xl">
    <VStack mt={10} mb={8}>
      <Heading alignSelf="center" mb={4}>
        Разработчики
      </Heading>
      <DeveloperCard
        icon={FaCamera}
        name="Эльдар"
        gitLink="https://github.com/pdlmn"
        position="Разработчик"
        photo="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
      />
      <DeveloperCard
        icon={FaDrum}
        name="Саша"
        gitLink="https://github.com/XHHJlT"
        position="Разработчик"
        photo="https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
        text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
        prop={{ ml: 'auto' }}
      />
      <DeveloperCard
        icon={FaBicycle}
        name="Милена"
        gitLink="https://github.com/Milena-Belianova"
        position="Разработчик"
        photo="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80"
        text={'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'}
      />
    </VStack>
  </Container>
);
