import { Container, Heading, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { groupButtonData } from './groupButtonData';
import { GroupButtons } from './groupButtons';
import { WordsBlock } from './wordsBlock';

export const TextbookMain = () => {
  const [group, setGroup] = useState(groupButtonData[0]);

  return (
    <Container maxW="container.xl" p="1rem 1rem">
      <Stack spacing={4}>
        <Heading as="h1" alignSelf="center" bg="linear-gradient(transparent 50%, #83e9e7 50%)" shadow="lg">
          Учебник
        </Heading>
        <GroupButtons group={group} setGroup={setGroup} />
        <WordsBlock group={group} />
      </Stack>
    </Container>
  );
};
