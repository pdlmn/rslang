import {
  Flex,
  Text,
  Image,
  Button,
  HStack,
  VStack,
  Stack,
  Tooltip,
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
        color="gray.700"
        _hover={{ bgColor: 'yellow.300', rounded: 'full' }}
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
    // h="50.5rem"
    border="1px solid"
    borderColor={`${group?.color.baseColor.split('.')[0]}.200`}
    direction="column"
    rounded="md"
  >
    <Image
      w="400px"
      h="230px"
      objectFit="cover"
      src={`${API_URI}/${selectedWord?.image}`} // "image":"files/01_0018.jpg"
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
        <Button>+ в сложные слова</Button>
        <Button>удалить слово</Button>
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

// для каждого слова отображается:
// само слово, транскрипция, перевод
// предложение с объяснением значения слова, перевод предложения
// предложение с примером использования изучаемого слова, перевод предложения
// картинка-ассоциация к изучаемому слову
// иконка аудио, при клике по которой последовательно звучит произношение изучаемого слова,
// произношение
// предложения с объяснением его значения, произношение предложения с примером его использования

// только у авторизированных пользователей отображаются:
// кнопка, при клике по которой слово можно отметить как сложное (в разделе "Сложные слова"
// на её месте отображается кнопка, снимающая отметку что это сложное слово и удаляющая
// его из данного раздела)
// кнопка, при клике по которой слово можно отметить как изученное
// если слово отмечено как сложное, оно остаётся на странице учебника и выделяется стилем,
// указывающим, что данное слово относится к сложным словам. Также данное слово добавляется
// в раздел "Сложные слова"
// если слово отмечено как изученное, оно остаётся на странице учебника и выделяется стилем,
// указывающим, что данное слово относится к изученным словам
// если все слова на странице относятся к изученным словам или к изученным и сложным словам,
// такая страница считается полностью изученной и выделяется стилем. Также стилем выделяется
// соответствующая ей
// кнопка навигации по страницам учебника. Ссылки на мини-игры на этой странице
// становятся неактивными.
