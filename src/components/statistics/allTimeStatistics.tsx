import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Text,
  Heading,
  useColorModeValue,
  useToken,
  IconButton,
  Tooltip,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppDispatch, useTypedSelector } from '../../redux';
import { statisticsChangeDate } from '../../redux/actions/statistics';
import {
  dateInThisWeek,
  formatDate, getLastWeeksDate, getNextWeeksDate, isFutureDate, isPastDate,
} from '../../utils/date';
import { Point } from './types';

interface AllTimeStatisticsProps {
  data: Point[];
  wordsPerDayGoal: number;
  prevWeeksData: Omit<Point, 'date'>
}

export const AllTimeStatistics = ({
  data,
  wordsPerDayGoal,
  prevWeeksData,
}: AllTimeStatisticsProps) => {
  const [successColor, failColor, gridColor, lineColor, pointColor] = useToken('colors', [
    useColorModeValue('green.500', 'green.400'),
    useColorModeValue('red.500', 'red.400'),
    useColorModeValue('gray.200', 'gray.700'),
    useColorModeValue('yellow.400', 'yellow.200'),
    useColorModeValue('white', 'gray.800'),
  ]);

  const { user } = useTypedSelector((state) => state.auth);
  const { date, isLoading } = useTypedSelector((state) => state.statistics);
  const dispatch = useAppDispatch();

  const generateOptions = (
    showWordsPerDayThreshold: boolean,
    target: 'learnedWords' | 'newWords',
    min: number | undefined = undefined,
  ): ChartOptions<'line'> => ({
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
            if (!user) {
              return 'Вы ещё не зарегистрированы\n';
            }
            if (isFutureDate(data[context.dataIndex].date)) {
              return 'Этот день ещё не наступил...\n';
            }
            if (isPastDate(data[context.dataIndex].date, new Date(user.signedUp))) {
              return 'Вы тогда ещё не были\nзарегистрированы\n';
            }

            if (target === 'learnedWords') {
              if (data[context.dataIndex].learnedWords < wordsPerDayGoal) {
                return 'В этот день вы не достигли цели\n';
              }
              return 'В этот день вы выучили достаточно слов!\n';
            }

            if (target === 'newWords') {
              if (data[context.dataIndex].newWords > 0) {
                return 'В этот день вы встретили\nновых слова\n';
              }
              return 'В этот день вы не встретили\nновых слов\n';
            }

            return '';
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
          stepSize: 10,
        },
        suggestedMin: min,
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
          if (!user) {
            return gridColor;
          }
          if (isPastDate(data[context.dataIndex].date, new Date(user.signedUp))) {
            return gridColor;
          } if (isFutureDate(data[context.dataIndex].date)) {
            return lineColor;
          }
          if (target === 'learnedWords') {
            if (data[context.dataIndex].learnedWords < wordsPerDayGoal) {
              return failColor;
            }
            return successColor;
          }

          if (target === 'newWords') {
            if (data[context.dataIndex].newWords === 0) {
              return failColor;
            }
            return successColor;
          }
          return gridColor;
        },
        radius: 5,
        borderWidth: 3,
        backgroundColor: pointColor,
      },
    },
  });

  const learnedPerDay: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Изученных слов в день',
        data: data.map((ds) => ds.learnedWords),
      },
    ],
  };

  const learnedOverall: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Изученные слова за всё время',
        data: (() => {
          const result = [];

          let j = prevWeeksData.learnedWords;
          for (let i = 0; i < data.length; i += 1) {
            j += data[i].learnedWords;
            result.push(j);
          }

          return result;
        })(),
      },
    ],
  };

  const newPerDay: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Новых слов в день',
        data: data.map((ds) => ds.newWords || 0),
      },
    ],
  };

  const newOverall: ChartData<'line'> = {
    labels: data.map((ds) => formatDate(ds.date)),
    datasets: [
      {
        label: 'Новые слова за всё время',
        data: (() => {
          const result = [];

          let j = prevWeeksData.newWords;
          for (let i = 0; i < data.length; i += 1) {
            j += data[i].newWords || 0;
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
      <Flex alignItems="center" justifyContent="center" mt="9" mb="6" gap="3">
        {user && (
        <Box>
          <Tooltip
            label="До этой недели вы не были зарегистрированы"
            shouldWrapChildren
            hasArrow
            mt="3"
            placement="left-end"
            isDisabled={!dateInThisWeek(user.signedUp, date)}
          >
            <IconButton
              aria-label="button-left"
              icon={<ArrowLeftIcon />}
              variant="ghost"
              disabled={!user || isLoading || dateInThisWeek(user.signedUp, date)}
              isLoading={isLoading}
              onClick={() => dispatch(statisticsChangeDate(getLastWeeksDate(date)))}
            />
          </Tooltip>
        </Box>
        )}
        <Box>
          <Text fontSize="xl" height="33px" textAlign="center">
            {user ? 'Переключить неделю' : 'Зарегистрируйтесь для доступа к статистике'}
          </Text>
          {user && (
          <Text fontStyle="italic" textAlign="center">
            {`${formatDate(data[0].date)} - ${formatDate(data[data.length - 1].date)}`}
          </Text>
          )}
        </Box>
        {user && (
          <Box>
            <Tooltip
              label="Эта неделя ещё не прошла"
              shouldWrapChildren
              hasArrow
              mt="3"
              placement="right-end"
              isDisabled={!dateInThisWeek(new Date(), date)}
            >
              <IconButton
                aria-label="button-right"
                icon={<ArrowRightIcon />}
                variant="ghost"
                disabled={!user || isLoading || dateInThisWeek(new Date(), date)}
                isLoading={isLoading}
                onClick={() => dispatch(statisticsChangeDate(getNextWeeksDate(date)))}
              />
            </Tooltip>
          </Box>
        )}
      </Flex>
      <Flex justifyContent="center">
        <Tabs defaultIndex={1} align="center">
          <TabList>
            <Tab>Выученные слова</Tab>
            <Tab>Новые слова</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
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
                  <Line data={learnedPerDay} options={generateOptions(true, 'learnedWords', 0)} />
                </Box>
                <Box width="100%" minW="360px" maxW="500px" height="250px" position="relative">
                  <Text fontStyle="italic" textAlign="center">
                    Сколько слов вы выучили всего.
                  </Text>
                  <Line data={learnedOverall} options={generateOptions(false, 'learnedWords', undefined)} />
                </Box>
              </Flex>
            </TabPanel>
            <TabPanel>
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
                    Сколько новых слов вы встретили за день.
                  </Text>
                  <Line data={newPerDay} options={generateOptions(false, 'newWords', 0)} />
                </Box>
                <Box width="100%" minW="360px" maxW="500px" height="250px" position="relative">
                  <Text fontStyle="italic" textAlign="center">
                    Сколько новых слов вы встретили всего.
                  </Text>
                  <Line data={newOverall} options={generateOptions(false, 'newWords', undefined)} />
                </Box>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};
