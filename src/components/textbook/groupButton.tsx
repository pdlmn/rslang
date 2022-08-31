import {
  Button,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { GroupButtonData } from './groupButtonData';

type GroupButtonProps = GroupButtonData & {
  onClick: () => void;
  selected: boolean;
};

export const GroupButton = ({
  lvl,
  numWords,
  grade,
  color,
  onClick,
  selected,
}: GroupButtonProps) => {
  const bgColorSelecter = useColorModeValue(color.hoverColor, color.activeColor);
  const bgColorSelecterBase = useColorModeValue('gray.50', 'gray.700');
  const colorSelectedOrHoverDark = useColorModeValue('gray.800', 'gray.800');
  const colorBase = useColorModeValue('gray.800', 'gray.200');
  return (
    <Button
      h="4.5rem"
      w="11.5rem"
      flexGrow="1"
      overflow="hidden"
      pr={2}
      pl={4}
      borderLeft="4px dashed"
      borderLeftColor="red.300"
      borderBottomEndRadius="3xl"
      bgColor={selected ? bgColorSelecter : bgColorSelecterBase}
      shadow="md"
      transition="all .25s ease-in-out"
      color={selected ? colorSelectedOrHoverDark : colorBase}
      _hover={{ bgColor: `${color.hoverColor}`, color: colorSelectedOrHoverDark }}
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
};
