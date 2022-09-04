import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading, HStack, Stat, StatLabel, StatNumber,
  Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue,
} from '@chakra-ui/react';
import { useTypedSelector } from '../../../../../redux';
import { SoundBtn } from './soundBtn';

export const StatisticsScreen = () => {
  const { words, correctAnswersRowMax } = useTypedSelector((state) => state.games);
  const rightWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => word.isCorrect);
  const wrongWords = words
    .filter((word) => word.isAnswered)
    .filter((word) => !word.isCorrect);
  const accuracy = Math.floor((rightWords.length / (rightWords.length + wrongWords.length)) * 100) || 0;

  return (
    <Tabs isFitted variant="enclosed" h="100%" w="100%">
      <TabList>
        <Tab>Статистика</Tab>
        <Tab>Слова</Tab>
      </TabList>
      <TabPanels h="100%">
        <TabPanel h="100%">
          <Flex gap={10} align="center" h="100%">
            <Stat display="flex" alignItems="center" justifyContent="center">
              <StatNumber fontSize="7xl" textAlign="center">
                {correctAnswersRowMax}
              </StatNumber>
              <StatLabel fontSize={{ sm: 'xl', md: '2xl' }} textAlign="center">Серия без ошибок</StatLabel>
            </Stat>
            <Stat display="flex" alignItems="center" justifyContent="center">
              <StatNumber fontSize={{ sm: '4xl', md: '6xl' }} textAlign="center">
                <CircularProgress
                  color={accuracy === 100
                    ? useColorModeValue('green.400', 'green.300')
                    : useColorModeValue('yellow.400', 'yellow.300')}
                  trackColor={useColorModeValue('gray.200', 'gray.600')}
                  thickness="7px"
                  value={accuracy}
                  size="110px"
                >
                  <CircularProgressLabel fontSize="3xl">
                    {accuracy}
                    %
                  </CircularProgressLabel>
                </CircularProgress>
              </StatNumber>
              <StatLabel fontSize={{ sm: 'xl', md: '2xl' }} textAlign="center">Правильных ответов</StatLabel>
            </Stat>
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex gap={10}>
            <Flex direction="column" alignItems="flex-start" justify="flex-start" h="100%">
              <Heading size="sm" borderBottom="2px solid green" alignSelf="center">
                Правильно
              </Heading>
              {rightWords.map((word) => (
                <HStack key={word.id}>
                  <SoundBtn audio={word.audio} />
                  <Text>{`${word.word} - ${word.wordTranslate}`}</Text>
                </HStack>
              ))}
            </Flex>
            <Flex direction="column" alignItems="flex-start" justifyContent="start">
              <Heading size="sm" borderBottom="2px solid red" alignSelf="center">
                Неправильно
              </Heading>
              {wrongWords
                .map((word) => (
                  <HStack key={word.id}>
                    <SoundBtn audio={word.audio} />
                    <Text>{`${word.word} - ${word.wordTranslate}`}</Text>
                  </HStack>
                ))}
            </Flex>
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
