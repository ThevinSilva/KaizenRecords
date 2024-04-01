import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const Option = styled(motion.li)`
  list-style: none;
  cursor: pointer;
  position: relative;
  padding: 8px 16px;
  overflow: hidden; // Ensure the highlight does not overflow
`;

const Highlight = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.accent};
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 5px;
`;

const options = ["resume", "controls", "restart"];

export default function Pause({ setState }) {
  const [hovered, setHovered] = useState(null);

  return (
    <Container
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      <h2>Pause</h2>
      <ul>
        {options.map((option, i) => (
          <Option
            key={option}
            onHoverStart={() => setHovered(option)}
            onHoverEnd={() => setHovered(null)}
            onClick={() =>
              setState((state) => (state === "paused" ? "running" : "paused"))
            }
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {hovered === option && <Highlight layoutId="active-pill" />}
            {option}
          </Option>
        ))}
      </ul>
    </Container>
  );
}
