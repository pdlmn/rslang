import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  InputProps,
} from '@chakra-ui/react';
import { useState } from 'react';

export const PasswordInput = (props: Omit<InputProps, 'type'>) => {
  const [show, setShow] = useState(false);
  const { size } = props;

  return (
    <InputGroup size={size}>
      <Input
        type={show ? 'text' : 'password'}
        {...props}
      />
      <InputRightElement>
        <IconButton
          icon={show ? <ViewOffIcon /> : <ViewIcon />}
          variant="ghost"
          aria-label="Show password"
          onClick={() => setShow(!show)}
        >
          Show
        </IconButton>
      </InputRightElement>
    </InputGroup>
  );
};
