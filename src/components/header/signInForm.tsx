import {
  Button,
  FormControl,
  FormErrorMessage,
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
import { useAppDispatch, useTypedSelector } from '../../redux';
import { signInChange, signInSubmit } from '../../redux/actions/signInActions';
import { PasswordInput } from './passwordInput';

interface SignInFormProps {
  isSignInOpen: boolean
  onSignInClose: () => void
}

export const SignInForm = ({ isSignInOpen, onSignInClose }: SignInFormProps) => {
  const dispatch = useAppDispatch();
  const signInState = useTypedSelector((state) => state.signIn);
  const signInRef = useRef(null);

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name !== 'email' && name !== 'password') return;
    dispatch(signInChange({ [name]: value }));
  };

  const sendUserData = () => {
    dispatch(signInSubmit());
  };

  const isUserExist = ['example@gmail.com', 'rsschool@gmail.com'].includes(signInState.email);

  const isPasswordCorrect = signInState.password === '13131313';

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
            Добро пожаловать снова :)
          </Text>
          <Text
            fontSize="x-large"
            textAlign="center"
            pt={4}
          >
            Вход
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={5}>
            <FormControl isInvalid={!isUserExist && signInState.failed}>
              <Input
                placeholder="E-mail"
                type="email"
                size="lg"
                name="email"
                ref={signInRef}
                onChange={handleSignInChange}
                value={signInState.email}
              />
              {signInState.failed && !isUserExist && (
                <FormErrorMessage>No user with such email.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!isPasswordCorrect && signInState.failed}>
              <PasswordInput
                placeholder="Пароль"
                size="lg"
                name="password"
                onChange={handleSignInChange}
                value={signInState.password}
              />
              {signInState.failed && !isPasswordCorrect && (
                <FormErrorMessage>Incorrect password.</FormErrorMessage>
              )}
            </FormControl>
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
            isLoading={signInState.loading}
            onClick={sendUserData}
          >
            Войти
          </Button>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            variant="link"
            color="blue.200"
            fontWeight="medium"
          >
            Создать аккаунт
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
