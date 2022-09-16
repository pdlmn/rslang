import {
  Box, Divider, Flex, Heading, Icon, useColorModeValue, useToken,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface StatCardProps {
  heading: string,
  icon: IconType,
  newWords: number | string,
  learnedWords: number | string,
  correctAnswersInARow: number | string,
  accuracy: number | string,
  lightMode: string,
  darkMode: string,
}

export const StatCard = ({
  heading,
  icon,
  newWords,
  learnedWords,
  correctAnswersInARow,
  accuracy,
  lightMode,
  darkMode,
}: StatCardProps) => {
  const [lightModeColor, darkModeColor] = useToken(
    'colors',
    [lightMode, darkMode],
  );
  return (
    <Flex
      width={{ base: '100%', md: 'lg' }}
      fontSize="xl"
      padding="2"
      border="2px solid"
      borderColor={useColorModeValue('gray.400', 'gray.600')}
      borderRadius="md"
    >
      <Box width="100%">
        <Heading
          as="h4"
          mb="2"
          display="flex"
          alignItems="center"
          bg={useColorModeValue(
            `linear-gradient(transparent 50%, ${lightModeColor} 50%)`,
            `linear-gradient(transparent 50%, ${darkModeColor} 50%)`,
          )}
        >
          <Icon as={icon} mr="2" />
          {heading}
        </Heading>
        <Divider />
        <Flex justifyContent="space-between">
          <Box>
            новых слов
          </Box>
          <Box>{newWords}</Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Box>
            изученных слов
          </Box>
          <Box>{learnedWords}</Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Box>
            правильных ответов
          </Box>
          <Box>
            {accuracy}
            %
          </Box>
        </Flex>
        <Flex justifyContent="space-between">
          <Box>
            правильных подряд
          </Box>
          <Box>{correctAnswersInARow}</Box>
        </Flex>
      </Box>
    </Flex>
  );
};
