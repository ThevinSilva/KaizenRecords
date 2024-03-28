import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import GameManager from "../lib/game/game";
import { motion } from "framer-motion"; // score board
import Odometer from "react-odometerjs";
// leader board using mongodb ?

// GAME PLAN

// UTILS

const leadingZeroes = (val, digits) => {
  const str = val.toString();
  if (digits <= str.length) return str;
  return "0".repeat(digits - str.length) + val.toString();
};

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
    /* border: 1px solid black; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }

  .odometer-value {
    /* text-align: center; */
    font-family: Roboto;
    font-weight: 400;
  }
`;

export default function About() {
  const isDesktop = useMediaQuery({ query: "(min-width : 768px)" });
  const ref = useRef(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = ref.current;
    const gameManager = new GameManager(canvas, setScore);

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
      <h2>
        {leadingZeroes(score, 5)}
        {/* NOTE : odometer needs leading zeroes and flash a few times on the screen every certain mile stone */}
      </h2>

      <canvas ref={ref} />
    </Container>
  );
}
