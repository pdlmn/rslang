import { ReactElement } from 'react';
import {
  Icon, Text, Stack, Flex, useColorModeValue,
} from '@chakra-ui/react';
import { FcDonate, FcPuzzle, FcReadingEbook } from 'react-icons/fc';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => (
  <Stack align="center" justify="start" w={80} h={44}>
    <Flex
      w={16}
      h={16}
      align="center"
      justify="center"
      color="white"
      rounded="full"
      bg="gray.100"
      mb={1}
    >
      {icon}
    </Flex>
    <Text fontWeight={600} fontSize="lg">{title}</Text>
    <Text align="center" color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
  </Stack>
);

export const Features = () => (
  <Flex
    direction={{ base: 'column', md: 'row' }}
    p="7rem 1rem 6rem"
    maxW="1280px"
    m="0 auto"
    justify="space-between"
  >
    <Feature
      icon={<Icon as={FcDonate} w={10} h={10} />}
      title="Бесплатный доступ"
      text="Обучение абсолютно бесплатно. Наша миссия — сделать обучение английского языка доступным для каждого "
    />
    <Feature
      icon={<Icon as={FcPuzzle} w={10} h={10} />}
      title="Обучение в игре"
      text="Тренировки созданы так, что больше похоже на игру, но при этом ты эффективно обучаешься языку"
    />
    <Feature
      icon={<Icon as={FcReadingEbook} w={10} h={10} />}
      title="Обучение на актуальных материалах"
      text="Тренируйся по современным материалам, которые доказали свою эффективность и нравятся пользователям"
    />
  </Flex>
);
