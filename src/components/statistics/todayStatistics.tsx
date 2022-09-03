import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaHeadphones } from 'react-icons/fa';
import { GiSprint } from 'react-icons/gi';
import { StatCard } from './statCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface TodayStatisticsProps {
  accuracy: number;
}

export const TodayStatistics = ({
  accuracy,
}: TodayStatisticsProps) => (
  <Box>
    <Heading as="h2" size="2xl" textAlign="center">
      За сегодня
    </Heading>

    <Flex alignItems="center" height="44" mt="4">
      <Stat width="24" display="flex" alignItems="center" justifyContent="center">
        <StatNumber fontSize="7xl" textAlign="center">
          15
        </StatNumber>
        <StatLabel fontSize={{ sm: 'xl', md: '2xl' }} textAlign="center">Новых выученных слов</StatLabel>
      </Stat>
      <Stat width="24" display="flex" alignItems="center" justifyContent="center">
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
        <StatLabel fontSize={{ sm: 'xl', md: '2xl' }} textAlign="center">Правильных ответов в играх</StatLabel>
      </Stat>
    </Flex>

    <Flex
      justifyContent="center"
      alignItems="center"
      gap={16}
      mt="16"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <StatCard
        heading="Аудиовызов"
        icon={FaHeadphones}
        learnedWords={13}
        accuracy={74}
        correctAnswersInARow={8}
        lightMode="pink.200"
        darkMode="pink.600"
      />

      <StatCard
        heading="Спринт"
        icon={GiSprint}
        learnedWords={20}
        accuracy={88}
        correctAnswersInARow={17}
        lightMode="green.200"
        darkMode="green.600"
      />
    </Flex>
  </Box>
);
