import {
  Flex,
  Text,
  Image,
  Button,
  HStack,
  VStack,
  Stack,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { ImVolumeMedium } from 'react-icons/im';
import useSound from 'use-sound';
import { Word } from '../../interfaces/types';
import { API_URI } from '../../services/common';
import { GroupButtonData } from './groupButtonData';

export type WordDescriptionCardProps = {
  group?: GroupButtonData;
  selectedWord: Word;
};

const SoundButton = ({ selectedWord }: WordDescriptionCardProps) => {
  const { audio, audioMeaning, audioExample } = selectedWord;
  const [audioSrc, audioExampleSrc, audioMeaningSrc] = [
    audio,
    audioExample,
    audioMeaning,
  ].map((s) => `${API_URI}/${s}`);
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
  }, [selectedWord]);

  useEffect(() => {
    if (audioData.sound && audioMeaningData.sound && !handlersReady) {
      audioData.sound.on('end', playAudioMeaning);
      audioMeaningData.sound.on('end', playAudioExample);
      setHandlersReady(true);
    }

    return () => stopAll();
  }, [audioData, playAudioMeaning, playAudioExample, handlersReady]);

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

export const WordDescriptionCard = ({
  group,
  selectedWord,
}: WordDescriptionCardProps) => (
  <Flex
    w="400px"
    border="1px solid"
    borderColor={`${group?.color.baseColor.split('.')[0]}.200`}
    direction="column"
    rounded="md"
  >
    <Image
      w="400px"
      h="230px"
      objectFit="cover"
      src={`${API_URI}/${selectedWord?.image}`}
      alt={selectedWord?.word}
      roundedTop="md"
    />
    <VStack p={4}>
      <Text fontSize="3xl" fontWeight="bold">
        {selectedWord?.word}
      </Text>
      <Text fontSize="xl" fontWeight="500">
        {selectedWord?.wordTranslate}
      </Text>
      <HStack>
        <Text fontSize="xl" fontWeight="500">
          {selectedWord?.transcription}
        </Text>
        {selectedWord && <SoundButton selectedWord={selectedWord} />}
      </HStack>
      <HStack spacing={8} pt={2} pb={2}>
        <Button colorScheme="green" lineHeight={1}>+ в сложные слова</Button>
        <Button colorScheme="red" lineHeight={1}>удалить слово</Button>
      </HStack>
      <Stack>
        <Text align="center" fontWeight="bold">
          Значение
        </Text>
        <Text
          align="left"
          dangerouslySetInnerHTML={{ __html: selectedWord?.textMeaning || '' }}
        />
        <Text>{selectedWord?.textMeaningTranslate}</Text>
        <Text align="center" fontWeight="bold">
          Пример
        </Text>
        <Text
          align="start"
          dangerouslySetInnerHTML={{ __html: selectedWord?.textExample || '' }}
        />
        <Text>{selectedWord?.textExampleTranslate}</Text>
      </Stack>
    </VStack>
  </Flex>
);
