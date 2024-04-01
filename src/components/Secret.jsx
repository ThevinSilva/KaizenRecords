import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import GameManager from "../lib/game/game";
import { FaPause } from "react-icons/fa";

// Game UI
import Stats from "./game/Stats";
import Pause from "./game/Pause";

// leader board using mongodb ?

// GAME PLAN

// UTILS

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
`;

const GameUI = styled.div`
  /* border: 1px solid black; */
  position: absolute;
  width: ${(props) => props.canvasSize.width}px;
  height: ${(props) => props.canvasSize.height}px;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  /* max-height: 100%; */
  z-index: 100;
`;

const Button = styled.button`
  all: unset;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  /* height: 100%; */
  cursor: pointer;
  color: ${(props) => props.theme.colors.light};
  background-color: transparent;
  text-decoration: none;
`;

export default function About() {
  const isDesktop = useMediaQuery({ query: "(min-width : 768px)" });
  const cavasRef = useRef(null);
  const gameManagerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [state, setState] = useState("running"); //game state
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 500 });

  useEffect(() => {
    const canvas = cavasRef.current;
    gameManagerRef.current = new GameManager(canvas, setScore);
    gameManagerRef.current.start();
    const updateCanvasSize = () => {
      if (canvas) {
        setCanvasSize({
          width: canvas.clientWidth,
          height: canvas.clientHeight,
        });
      }
    };

    updateCanvasSize(); // Initial update

    // Adjust canvas size on window resize
    window.addEventListener("resize", updateCanvasSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    switch (state) {
      case "paused":
        gameManagerRef.current.pause();
        break;
      default: // running
        gameManagerRef.current.pause();
    }
  }, [state]);

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
      <GameUI canvasSize={canvasSize}>
        <Button
          onClick={() => setState(state === "paused" ? "running" : "paused")}
        >
          <FaPause />
        </Button>
        <Stats score={score} />
        {state === "paused" || <Pause setState={setState} />}
        {/* NOTE : odometer needs leading zeroes and flash a few times on the screen every certain mile stone */}
      </GameUI>

      <canvas ref={cavasRef} />
    </Container>
  );
}
