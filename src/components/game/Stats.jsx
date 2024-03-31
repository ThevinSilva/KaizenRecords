import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: absolute;
  right: 0;
  margin: 10px;
`;

const leadingZeroes = (val, digits) => {
  const str = val.toString();
  if (digits <= str.length) return str;
  return "0".repeat(digits - str.length) + val.toString();
};

// eslint-disable-next-line react/prop-types
export default function Stats({ score }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (score % 100 === 0 && score !== 0) {
      setIsBlinking(true);
      const timer = setTimeout(() => {
        setIsBlinking(false);
      }, 1000); // 2 seconds

      // Cleanup the timer
      return () => clearTimeout(timer);
    }
  }, [score]); // Depend on score, so it checks every time score changes

  return (
    <Container
      style={{ display: 'inline-block' }}
      animate={{ opacity: isBlinking ? [1, 0, 1] : 1 }} 
      transition={{
        duration: 0.5, 
        ease: "linear",
        repeat: isBlinking ? 5 : 0, // Repeat twice if isBlinking is true
        repeatType: "loop" // Ensure the animation loops
      }}
    >
      {leadingZeroes(score, 5)}
    </Container>
  );
}
