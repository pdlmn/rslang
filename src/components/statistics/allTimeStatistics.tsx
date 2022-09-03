import {
  Box, Flex, Text, Heading, useColorModeValue, useToken,
} from '@chakra-ui/react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatDate } from '../../utils/date';

type DailyStatistics = {
  date: number,
  learnedWords: number,
};

interface AllTimeStatisticsProps {
  data: DailyStatistics[];
  wordsPerDayGoal: number;
}

export const AllTimeStatistics = ({
  data,
  wordsPerDayGoal,
}: AllTimeStatisticsProps) => {
  const chartStepSize = 10;

  const [successColor, failColor, gridColor, lineColor, pointColor] = useToken('colors', [
    useColorModeValue('green.500', 'green.400'),
    useColorModeValue('red.500', 'red.400'),
    useColorModeValue('gray.200', 'gray.700'),
    useColorModeValue('yellow.400', 'yellow.200'),
    useColorModeValue('yellow.400', 'gray.800'),
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
          if (data[context.dataIndex].learnedWords < wordsPerDayGoal) {
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

  const data1: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Изученных слов в день',
        data: data.map((ds) => ds.learnedWords),
      },
    ],
  };

  const data2: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Изученных слов за всё время',
        data: (() => {
          const result = [];

          let j = 0;
          for (let i = 0; i < data.length; i += 1) {
            j += data[i].learnedWords;
            result.push(j);
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
          <Line data={data1} options={generateOprions(true)} />
        </Box>
        <Box width="100%" minW="360px" maxW="500px" height="250px" position="relative">
          <Text fontStyle="italic" textAlign="center">
            Сколько слов вы выучили всего.
          </Text>
          <Line data={data2} options={generateOprions(false)} />
        </Box>
      </Flex>
    </Box>
  );
};
