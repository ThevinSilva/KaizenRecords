import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";
import GameManager from "../lib/game/game";
import { motion } from "framer-motion"; // score board
// leader board using mongodb ?

// GAME PLAN

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: start; // Align content to the top
  align-items: start; // Align content to the left
  width: 100%;
  height: 90%;
  overflow: hidden;
  font-family: ${(props) => props.theme.fonts.primary};
  color: ${(props) => props.theme.colors.dark};
  z-index: 100;

  canvas {
    border: 1px solid black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }
`;

export default function About() {
  const isDesktop = useMediaQuery({ query: "(min-width : 768px)" });
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gameManager = new GameManager(canvas);
    gameManager.gameLoop();

    // Desktop listener
    // document.addEventListener("keydown");
  }, []);

  return (
    <Container
      style={{
        top: isDesktop ? "50px" : "35px",
        left: isDesktop ? "50px" : "35px",
        height: `calc(100% - ${isDesktop ? "100px" : "70px"})`,
        width: `calc(100% - ${isDesktop ? "100px" : "70px"})`,
        transition: { duration: 1 },
      }}
      wrapText={true}
      minSize={"4em"}
    >
      <canvas ref={ref} />
    </Container>
  );
}
