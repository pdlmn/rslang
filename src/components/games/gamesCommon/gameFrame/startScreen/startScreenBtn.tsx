import { Button } from '@chakra-ui/react';
import { useAction } from '../../../../../hooks/useAction';
import { StartScreenBtnProps } from '../../../../../interfaces/gamesCommon';
import { useTypedSelector } from '../../../../../redux';

export const StartScreenBtn = ({ label, color }: StartScreenBtnProps) => {
  const { level } = useTypedSelector((state) => state.games);
  const { selectLevel } = useAction();

  return (
    <Button
      display={{ base: 'inline-flex', md: 'inline-flex' }}
      fontSize={{ base: 'xs', md: 'md' }}
      size={{ base: 'xs', md: 'md' }}
      fontWeight={600}
      color="white"
      bg={`${color}.300`}
      _hover={{
        bg: `${color}.200`,
      }}
      boxShadow={`0 0 ${level === label ? '2' : '0'}em ${color}`}
      onClick={() => {
        selectLevel({ level: label });
      }}
    >
      {label}
    </Button>
  );
};
