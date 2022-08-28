import { Button } from '@chakra-ui/react';
import { useAction } from '../../../../../hooks/useAction';
import { StartScreenBtnProps } from '../../../../../interfaces/gamesCommon';
import { useTypedSelector } from '../../../../../redux';

export const StartScreenBtn = ({ label, color }: StartScreenBtnProps) => {
  const currentLevel = useTypedSelector((state) => state.games.level);
  const { selectLevel } = useAction();

  return (
    <Button
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize="md"
      fontWeight={600}
      color="white"
      bg={`${color}.300`}
      _hover={{
        bg: `${color}.200`,
      }}
      transform="auto"
      translateY={currentLevel === label ? '-10px' : '0'}
      onClick={() => {
        selectLevel({ level: label });
      }}
    >
      {label}
    </Button>
  );
};
