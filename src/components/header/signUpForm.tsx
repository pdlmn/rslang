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
import { signUpChange, signUpFail, signUpSubmit } from '../../redux/actions/signUpActions';
import { PasswordInput } from './passwordInput';

interface SignUpFormProps {
  isSignUpOpen: boolean
  onSignUpClose: () => void
}

export const SignUpForm = ({ isSignUpOpen, onSignUpClose }: SignUpFormProps) => {
  const dispatch = useAppDispatch();
  const signUpState = useTypedSelector((state) => state.signUp);
  const signUpRef = useRef(null);

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    dispatch(signUpChange({ [name]: value }));
  };

  const sendUserData = () => {
    dispatch(signUpSubmit());
  };

  const emailValidator = /(.+)@(.+)\.(.+)/;
  const isEmailValid = emailValidator.test(signUpState.email);

  const isPasswordValid = signUpState.password1.length >= 8;

  const arePasswordsMatch = signUpState.password1 === signUpState.password2;
  return (
    <Modal
      size="md"
      isOpen={isSignUpOpen}
      onClose={onSignUpClose}
      onCloseComplete={() => dispatch(signUpFail(false))}
      initialFocusRef={signUpRef}
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
              placeholder="Имя"
              type="text"
              size="lg"
              name="name"
              ref={signUpRef}
              onChange={handleSignUpChange}
              value={signUpState.name}
            />
            <FormControl isInvalid={signUpState.failed && !isEmailValid}>
              <Input
                placeholder="E-mail"
                type="email"
                size="lg"
                name="email"
                onChange={handleSignUpChange}
                value={signUpState.email}
              />
              {signUpState.failed && !isEmailValid && (
                <FormErrorMessage>Email is invalid.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={signUpState.failed && !isPasswordValid}>
              <PasswordInput
                placeholder="Пароль"
                size="lg"
                name="password1"
                onChange={handleSignUpChange}
                value={signUpState.password1}
              />
              {signUpState.failed && !isPasswordValid && (
                <FormErrorMessage>Password should be at least 8 characters long.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={signUpState.failed && !arePasswordsMatch}>
              <PasswordInput
                placeholder="Повторите пароль"
                size="lg"
                name="password2"
                onChange={handleSignUpChange}
                value={signUpState.password2}
              />
              {signUpState.failed && !arePasswordsMatch && (
                <FormErrorMessage>Passwords should match.</FormErrorMessage>
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
            isLoading={signUpState.loading}
            onClick={sendUserData}
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
