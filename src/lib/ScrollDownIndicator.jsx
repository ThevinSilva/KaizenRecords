import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;

// eslint-disable-next-line react/prop-types
export default function ScrollDownIndicator({ delay = 2 }) {
  return (
    <Wrapper
      initial={{ y: -10, opacity: 0 }}
      animate={{
        y: [ -10, 10, -10], // Bounce up and down
        opacity: [0, 1, 0] // Fade in in the middle, and fade out at the start/end
      }}
      transition={{
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.4,
        duration: 0.75,
        ease: "easeInOut",
        times: [0, 0.5, 1] // Corresponding times for each keyframe
      }}
    >
      <FaChevronDown size={30}/>
    </Wrapper>
  );
}
