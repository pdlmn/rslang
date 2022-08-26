import {
  Flex,
  Heading,
} from '@chakra-ui/react';
import { GroupButton } from './groupButton';
import { groupButtonData, GroupButtonData } from './groupButtonData';

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
