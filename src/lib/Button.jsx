import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import TextStaggerAnimation from "./TextStaggerAnimation";

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5em;
  height: 100%;
  cursor: pointer;
  color: ${(props) => props.theme.colors.light};
  background-color: transparent;
  text-decoration: none;
`;

// eslint-disable-next-line react/prop-types
export default function Button({ link, delay, children, internal = false }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!internal) {
      window.location.href = link;
    } else {
      navigate(link);
    }
  };

  return (
    <Container
      whileHover={{
        scale: 1.1,
        color: "#ca0e25",
      }}
      whileTap={{
        scale: 0.9,
        color: "#ca0e25",
      }}
      onClick={handleClick} // Use the handleClick function for onClick event
      transition={{
        delayChildren: delay,
      }}
    >
      <TextStaggerAnimation delay={1} stagger={0.1} offset={2}>
        {children}
      </TextStaggerAnimation>
    </Container>
  );
}
``;
