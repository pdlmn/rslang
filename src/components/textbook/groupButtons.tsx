import {
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { GroupButton } from './groupButton';
import { groupButtonData, GroupButtonData } from './groupButtonData';
import { setGroup, setShowComplexWords, setShowLearnedWords } from './textbook.actions';
import { getGroup } from './textbook.selectors';

export const GroupButtons = () => {
  const group = useSelector(getGroup);
  const dispatch = useDispatch();
  const dispatchSetGroup = useCallback(
    (g: GroupButtonData): AnyAction => dispatch(setGroup(g)),
    [dispatch],
  );
  const dispatchSetShowComplexWords = useCallback(
    (scw: boolean): AnyAction => dispatch(setShowComplexWords(scw)),
    [dispatch],
  );
  const dispatchSetShowLearnedWords = useCallback(
    (scw: boolean): AnyAction => dispatch(setShowLearnedWords(scw)),
    [dispatch],
  );

  return (
    <Flex direction="column" gap={4}>
      <Heading as="h3" size="md" userSelect="none">
        Выберите уровень сложности
      </Heading>
      <Flex wrap="wrap" gap="1rem">
        {groupButtonData.map((el) => (
          <GroupButton
            key={el.id}
            {...el}
            selected={group === el}
            onClick={() => {
              dispatchSetShowComplexWords(false);
              dispatchSetShowLearnedWords(false);
              dispatchSetGroup(el);
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};
