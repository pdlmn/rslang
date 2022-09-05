import { Box, useColorModeValue } from '@chakra-ui/react';

export type DottedBoxProps = {
  height: string,
  left: string,
};

export const DottedBox = ({ height, left }: DottedBoxProps) => (
  <Box
    position="absolute"
    left={left}
    top="-30px"
    height="full"
    maxW="700px"
    zIndex={-1}
    display={{base: 'none', sm: 'block'}}
  >
    <svg
      color={useColorModeValue('rgba(55,65,81, 0.1)', 'rgba(55,65,81, 0.7)')}
      width="500"
      height={height}
      fill="none"
    >
      <defs>
        <pattern
          id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <rect x="0" y="0" width="4" height="4" fill="currentColor" />
        </pattern>
      </defs>
      <rect
        width="404"
        height="404"
        fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
      />
    </svg>
  </Box>
);
