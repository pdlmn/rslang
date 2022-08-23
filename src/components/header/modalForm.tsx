import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Input,
  Button,
  Text,
  ModalFooter,
  Link,
} from '@chakra-ui/react';

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  headerText: string
  headerHeading: string
  buttonText: string
  altButtonText: string
  inputs: { type: string, placeholder: string }[]
}

export const ModalForm = ({
  isOpen,
  onClose,
  headerText,
  headerHeading,
  buttonText,
  altButtonText,
  inputs,
}: ModalProps) => {
  const inputElements = inputs.map(({ type, placeholder }) => (
    <Input
      size="lg"
      type={type}
      placeholder={placeholder}
    />
  ));

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            px={4}
            textAlign="center"
            fontWeight="medium"
            fontStyle="italic"
          >
            {headerText}
          </Text>
          <Text
            fontSize="x-large"
            textAlign="center"
            pt={4}
          >
            {headerHeading}
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack spacing={5}>
            {inputElements}
          </Stack>
          <Button
            mt="7"
            size="lg"
            width="100%"
            fontSize="xl"
            color="black"
            bg="yellow.400"
            _hover={{
              bg: 'yellow.300',
            }}
          >
            {buttonText}
          </Button>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Link
            href="/textbook"
            color="blue.200"
          >
            {altButtonText}
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
