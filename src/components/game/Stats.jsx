import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";

const leadingZeroes = (val, digits) => {
  const str = val.toString();
  if (digits <= str.length) return str;
  return "0".repeat(digits - str.length) + val.toString();
};

const Container = styled(motion.div)`
  position: absolute;
  right: 0;
  margin: 10px;
`;

// eslint-disable-next-line react/prop-types
export default function Stats({ score }) {
  const [repeat, setRepeat] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (score % 100 === 0 && score !== 0) {
      setRepeat(score);
      setTimeout(() => setRepeat(false), 1500);
      controls.start({
        opacity: [1, 0, 1],
        transition: { duration: 0.5, repeat: 2, ease: "linear" },
      });
    }
  }, [score, controls]);

  return (
    <Container style={{ display: "inline-block" }} animate={controls}>
      {leadingZeroes(repeat || score, 5)}
    </Container>
  );
}
