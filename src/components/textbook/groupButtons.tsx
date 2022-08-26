import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { groupButtonData, GroupButtonData } from './groupButtonData';

type GroupButtonProps = GroupButtonData & {
  onClick: () => void;
  selected: boolean;
};

const GroupButton = ({
  lvl,
  numWords,
  grade,
  color,
  onClick,
  selected,
}: GroupButtonProps) => (
  <Button
    h="4.5rem"
    w="11.5rem"
    flexGrow="1"
    overflow="hidden"
    pr={2}
    pl={4}
    borderLeft="4px dotted"
    borderLeftColor="red.300"
    borderBottomEndRadius="3xl"
    bgColor={selected ? useColorModeValue(color.hoverColor, color.activeColor) : useColorModeValue('gray.50', 'gray.700')}
    shadow="md"
    transition="all .25s ease-in-out"
    color={selected ? 'gray.800' : useColorModeValue('gray.800', 'gray.200')}
    _hover={{ bgColor: `${color.hoverColor}`, color: useColorModeValue('gray.800', 'gray.800') }}
    _active={{ bgColor: `${color.activeColor}`, transform: 'scale(0.95)' }}
    onClick={onClick}
  >
    <Flex w="100%" h="100%" justifyContent="space-between" align="center">
      <Stack spacing={1} align="flex-start">
        <Text fontSize="xl" fontWeight="bold">
          {lvl}
          {' '}
        </Text>
        <Text as="i" fontSize="sm" fontWeight="300">
          {numWords}
        </Text>
      </Stack>
      <Text
        w={14}
        fontSize="2xl"
        fontWeight="900"
        p={3}
        bgColor={color.baseColor}
        borderBottomRadius="3xl"
        roundedBottomLeft="3xl"
        mb={8}
      >
        {grade}
      </Text>
    </Flex>
  </Button>
);

type GroupButtonsProps = {
  group: GroupButtonData;
  setGroup: (group: GroupButtonData) => void;
};

export const GroupButtons = ({ group, setGroup }: GroupButtonsProps) => (
  <Flex direction="column" gap={4}>
    <Heading as="h3" size="md">
      Выберите уровень сложности
    </Heading>
    <Flex wrap="wrap" gap="1rem">
      {groupButtonData.map((el) => (
        <GroupButton
          key={el.id}
          {...el}
          selected={group === el}
          onClick={() => setGroup(el)}
        />
      ))}
    </Flex>
  </Flex>
);
