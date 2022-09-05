import { Button, useColorModeValue } from '@chakra-ui/react';
import { ImVolumeMedium } from 'react-icons/im';
import useSound from 'use-sound';
import { API_URI } from '../../../../../services/common';

type SoundBtnProps = {
  audio: string
};

export const SoundBtn = ({ audio }: SoundBtnProps) => {
  const [playAudio] = useSound(`${API_URI}/${audio}`, { volume: 0.7 });
  return (
    <Button
      size="xs"
      backgroundColor="transparent"
      color={useColorModeValue('gray.700', 'gray.400')}
      onClick={() => {
        playAudio();
      }}
    >
      <ImVolumeMedium />
    </Button>
  );
};
