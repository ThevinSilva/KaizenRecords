import { motion } from 'framer-motion';
import styled from 'styled-components';
import TextStaggeredAnimation from "../lib/TextStaggerAnimation"

const Text = styled(motion.span)`
  font-size: 10em;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.dark};
  display: block;
  z-index: 100;
`;

export default function Title() {
  // eslint-disable-next-line react/prop-types
  return (
    <Text>
      <TextStaggeredAnimation
        delay={100}
        stagger={0.2}
        offset={1}
      >
        Kaizen
      </TextStaggeredAnimation>
    </Text>
  );
}
