import {
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { GroupButton } from './groupButton';
import { groupButtonData, GroupButtonData } from './groupButtonData';
import { setGroup } from './textbook.actions';
import { getGroup } from './textbook.selectors';

export const GroupButtons = () => {
  const group = useSelector(getGroup);
  const dispatch = useDispatch();
  const dispatchSetGroup = useCallback(
    (g: GroupButtonData): AnyAction => dispatch(setGroup(g)),
    [dispatch],
  );

  return (
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
            onClick={() => dispatchSetGroup(el)}
          />
        ))}
      </Flex>
    </Flex>
  );
};
