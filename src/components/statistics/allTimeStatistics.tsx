import {
  Box, Flex, Text, Heading, useColorModeValue, useToken,
} from '@chakra-ui/react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatDate, isFutureDate, isPastDate } from '../../utils/date';

type DailyStatistics = {
  date: number,
  learnedWords: number,
};

interface AllTimeStatisticsProps {
  data: DailyStatistics[];
  wordsPerDayGoal: number;
  userSigningUpDate: number;
}

export const AllTimeStatistics = ({
  data,
  wordsPerDayGoal,
  userSigningUpDate,
}: AllTimeStatisticsProps) => {
  const chartStepSize = 10;

  const [successColor, failColor, gridColor, lineColor, pointColor] = useToken('colors', [
    useColorModeValue('green.500', 'green.400'),
    useColorModeValue('red.500', 'red.400'),
    useColorModeValue('gray.200', 'gray.700'),
    useColorModeValue('yellow.400', 'yellow.200'),
    useColorModeValue('white', 'gray.800'),
  ]);

  const generateOprions = (showWordsPerDayThreshold: boolean): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          beforeLabel: (context) => {
            if (isFutureDate(data[context.dataIndex].date)) {
              return 'Этот день ещё не наступил...\n';
            }
            if (isPastDate(data[context.dataIndex].date, new Date(userSigningUpDate))) {
              return 'Вы тогда ещё не были зарегистрированы\n';
            }
            if (data[context.dataIndex].learnedWords < wordsPerDayGoal) {
              return 'В этот день вы не достигли цели\n';
            }
            return 'В этот день вы выучили достаточно слов!\n';
          },
        },
        caretSize: 7,
        caretPadding: 9,
        intersect: false,
        bodyFont: {
          size: 19,
        },
        titleFont: {
          size: 20,
        },
      },
      decimation: {
        enabled: false,
      },
    },
    scales: {
      y: {
        grid: {
          color(context) {
            if ((context.tick.value === wordsPerDayGoal) && showWordsPerDayThreshold) {
              return successColor;
            }
            return gridColor;
          },
          lineWidth: (context) => {
            if ((context.tick.value === wordsPerDayGoal) && showWordsPerDayThreshold) {
              return 3;
            }
            return 1;
          },
        },
        ticks: {
          stepSize: chartStepSize,
        },
        suggestedMin: 0,
        suggestedMax: 50,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderColor: lineColor,
        tension: 0.15,
      },
      point: {
        borderColor: (context) => {
          if (isPastDate(data[context.dataIndex].date, new Date(userSigningUpDate))) {
            return gridColor;
          } if (isFutureDate(data[context.dataIndex].date)) {
            return lineColor;
          } if (data[context.dataIndex].learnedWords < wordsPerDayGoal) {
            return failColor;
          }
          return successColor;
        },
        radius: 5,
        borderWidth: 3,
        backgroundColor: pointColor,
      },
    },
  });

  const perDay: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Изученных слов в день',
        data: data.map((ds) => ds.learnedWords),
      },
    ],
  };

  const overall: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Изученных слов за всё время',
        data: (() => {
          const result = [];

          let j = 0;
          for (let i = 0; i < data.length; i += 1) {
            if (isFutureDate(data[i].date)) {
              result.push(0);
            } else {
              j += data[i].learnedWords;
              result.push(j);
            }
          }

          return result;
        })(),
      },
    ],
  };

  return (
    <Box>
      <Heading as="h2" size="2xl" textAlign="center">
        За всё время
      </Heading>
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        alignItems="center"
        gap={{ base: '8', md: '24' }}
        justifyContent="space-evenly"
        mt="6"
        pb="6"
      >
        <Box width="100%" minW="360px" maxW="500px" height="250px" position="relative">
          <Text fontStyle="italic" textAlign="center">
            Сколько слов вы учили за день.
          </Text>
          <Line data={perDay} options={generateOprions(true)} />
        </Box>
        <Box width="100%" minW="360px" maxW="500px" height="250px" position="relative">
          <Text fontStyle="italic" textAlign="center">
            Сколько слов вы выучили всего.
          </Text>
          <Line data={overall} options={generateOprions(false)} />
        </Box>
      </Flex>
    </Box>
  );
};
