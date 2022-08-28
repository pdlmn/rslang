import { Tooltip, Button, useColorModeValue } from '@chakra-ui/react';
import {
  useMemo, useCallback, useState, useEffect,
} from 'react';
import { ImVolumeMedium } from 'react-icons/im';
import { useSelector } from 'react-redux';
import useSound from 'use-sound';
import { Word } from '../../interfaces/services';
import { API_URI } from '../../services/common';
import { getSelectedWord } from './textbook.selectors';

export const SoundButton = () => {
  const selectedWord = useSelector(getSelectedWord);
  const { audio, audioMeaning, audioExample } = selectedWord as Word;
  const [audioSrc, audioExampleSrc, audioMeaningSrc] = useMemo(() => [
    audio,
    audioExample,
    audioMeaning,
  ].map((s) => `${API_URI}/${s}`), [audio, audioExample, audioMeaning]);
  const [playAudio, audioData] = useSound(audioSrc, { volume: 0.7 });
  const [playAudioMeaning, audioMeaningData] = useSound(audioMeaningSrc, {
    volume: 0.7,
  });
  const [playAudioExample, audioExampleData] = useSound(audioExampleSrc, {
    volume: 0.7,
  });

  const stopAll = useCallback(() => {
    audioData.stop();
    audioMeaningData.stop();
    audioExampleData.stop();
  }, [audioData, audioMeaningData, audioExampleData]);

  const [handlersReady, setHandlersReady] = useState(false);

  useEffect(() => {
    stopAll();
    setHandlersReady(false);
  }, [selectedWord, stopAll, setHandlersReady]);

  useEffect(() => {
    if (audioData.sound && audioMeaningData.sound && !handlersReady) {
      audioData.sound.on('end', playAudioMeaning);
      audioMeaningData.sound.on('end', playAudioExample);
      setHandlersReady(true);
    }

    return () => stopAll();
  }, [audioData, playAudioMeaning, playAudioExample, handlersReady, stopAll, setHandlersReady]);

  return (
    <Tooltip label="Озвучить" placement="right-start" rounded="md">
      <Button
        backgroundColor="transparent"
        p={2}
        color={useColorModeValue('gray.700', 'gray.400')}
        _hover={{ bgColor: 'yellow.300', rounded: 'full', color: useColorModeValue('gray.700', 'gray.800') }}
        _active={{ bgColor: 'yellow.400', rounded: 'full' }}
        onClick={() => {
          stopAll();
          playAudio();
        }}
      >
        <ImVolumeMedium />
      </Button>
    </Tooltip>
  );
};
