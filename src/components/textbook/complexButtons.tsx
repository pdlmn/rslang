import {
  Button, Flex, Text,
} from '@chakra-ui/react';

export type ComplexButtonData = {
  name: string;
};

const complexButtonData: Array<ComplexButtonData> = [{
  name: 'Сложные',
},
{
  name: 'Изучаемые',
},
{
  name: 'Удаленные',
}];

const ComplexButton = ({ name }: ComplexButtonData) => (
  <Button h="full" w="10rem" pl={0} flexGrow={{ base: '1', md: '0' }}>
    <Flex direction="column" align="flex-start" p={2} gap={1}>
      <Text fontSize="lg" fontWeight="bold">{name}</Text>
      {' '}
      <Text as="i" fontSize="sm" fontWeight="300">слова: 0</Text>
    </Flex>
  </Button>
);

export const ComplexButtons = () => (
  <Flex wrap="wrap" gap="1rem" justify="flex-end">
    {complexButtonData.map((el) => (
      <ComplexButton key={el.name} {...el} />
    ))}
  </Flex>
);
