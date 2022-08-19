import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import Slider from 'react-slick';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const Carousel = (props: any) => {
  const [slider, setSlider] = React.useState<Slider | null>(null);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '1rem' });

  const cards = [
    {
      image: '/assets/capture.png',
    },
    {
      image: '/assets/capture2.png',
    },
    {
      image: '/assets/capture3.png',
    },
  ];

  return (
    <Box
      position="relative"
      height="400px"
      width="710px"
      overflow="hidden"
      rounded="md"
      border="1px solid"
      borderColor="gray.100"
      shadow="sm"
      {...props}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        color="gray.700"
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        _hover={{ bg: 'blackAlpha.200', rounded: 'full' }}
        _active={{ bg: 'blackAlpha.300', rounded: 'full' }}
        onClick={() => slider?.slickPrev()}
      >
        <BsChevronCompactLeft size="30px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        color="gray.700"
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform="translate(0%, -50%)"
        zIndex={2}
        _hover={{ bg: 'blackAlpha.200', rounded: 'full' }}
        _active={{ bg: 'blackAlpha.300', rounded: 'full' }}
        onClick={() => slider?.slickNext()}
      >
        <BsChevronCompactRight size="30px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(s) => setSlider(s)}>
        {cards.map((card) => (
          <Box
            key={card.image}
            height="6xl"
            position="relative"
            backgroundRepeat="no-repeat"
            backgroundSize="contain"
            backgroundImage={`url(${card.image})`}
          />
        ))}
      </Slider>
    </Box>
  );
};
