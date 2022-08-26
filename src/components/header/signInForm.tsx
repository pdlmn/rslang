import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader, ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux';
import { signInChange } from '../../redux/actions/signInActions';
import { PasswordInput } from './passwordInput';

interface SignInFormProps {
  isSignInOpen: boolean
  onSignInClose: () => void
}

export const SignInForm = ({ isSignInOpen, onSignInClose }: SignInFormProps) => {
  const dispatch = useDispatch();
  const signInData = useTypedSelector((state) => state.signIn);
  const signInRef = useRef(null);

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(signInChange({ [name]: value }));
  };

  return (
    <Modal
      size="md"
      isOpen={isSignInOpen}
      onClose={onSignInClose}
      initialFocusRef={signInRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            px={4}
            textAlign="center"
            fontStyle="italic"
            fontWeight="thin"
          >
            Начни изучения языка сейчас!
          </Text>
          <Text
            fontSize="x-large"
            textAlign="center"
            pt={4}
          >
            Регистрация
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <Input
              placeholder="E-mail"
              type="email"
              size="lg"
              name="email"
              ref={signInRef}
              onChange={handleSignInChange}
              value={signInData.email}
            />
            <PasswordInput
              placeholder="Пароль"
              size="lg"
              name="password"
              onChange={handleSignInChange}
              value={signInData.password}
            />
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
            Создать аккаунт
          </Button>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant="link"
            color="blue.200"
            fontWeight="medium"
          >
            У меня уже есть аккаунт
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
