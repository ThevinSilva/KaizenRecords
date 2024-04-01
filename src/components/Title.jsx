import { motion } from "framer-motion";
import styled from "styled-components";

const Text = styled(motion.span)`
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.dark};
  display: block;
  z-index: 100;
  font-size: 10em;

  @media (max-width: 1200px) {
    font-size: 7em !important;
  }

  @media (max-width: 500px) {
    font-size: 5em !important;
  }
`;

export default function Title() {
  // eslint-disable-next-line react/prop-types
  return (
    <Text
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 2,
          type: "spring",
          damping: 9,
        },
      }}
    >
      {/* <TextPopUpAnimation
        delay={100}
        stagger={0.2}
        // offset={1}
      > */}
      Kaizen
      {/* </TextPopUpAnimation> */}
    </Text>
  );
}
