import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import GameManager from "../lib/game/game";
import { FaPause } from "react-icons/fa";

// Game UI
import Stats from "./game/Stats";
import Pause from "./game/Pause";
import Title from "./game/Title";
import Death from "./game/Death";

// leader board using mongodb ?

// GAME PLAN

// UTILS

// NOTE BUG RESTART NO ANIMATION FRAMES

const togglePause = (setState) =>
  setState((state) => (state === "paused" ? "running" : "paused"));

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
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
`;
const ArtistCredit = styled.a`
  position: absolute;
  top: 94%;
  left: 94%;
  color: white;
  text-decoration: none;
  z-index: 600;
  margin-top: 10px; /* Add some space above the artist credit */
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
  const [state, setState] = useState("title"); //game state
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 500 });

  useEffect(() => {
    const canvas = cavasRef.current;
    gameManagerRef.current = new GameManager(canvas, setScore, setState);
    const updateCanvasSize = () => {
      if (canvas) {
        setCanvasSize({
          width: canvas.clientWidth,
          height: canvas.clientHeight,
        });
      }
    };

    updateCanvasSize();

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
      case "reset":
        if (!gameManagerRef.current.player.death)
          gameManagerRef.current.pause();
        gameManagerRef.current.reset();
        setState("title");
        break;
      case "death":
        // gameManagerRef.current.pause();
        break;
      case "running":
        gameManagerRef.current.start();
        if (gameManagerRef.current.player.paused)
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
        {state === "running" && (
          <>
            {" "}
            <Button onClick={() => togglePause(setState)}>
              <FaPause />
            </Button>{" "}
            <Stats score={score} />{" "}
          </>
        )}
        {state === "paused" && <Pause setState={setState} />}
        {state === "title" && (
          <Title setState={setState} gameManagerRef={gameManagerRef} />
        )}

        {state === "death" && <Death score={score} setState={setState} />}
        <ArtistCredit href="https://www.instagram.com/mentalratt/">
          artist
        </ArtistCredit>
        {/* NOTE : odometer needs leading zeroes and flash a few times on the screen every certain mile stone */}
      </GameUI>

      <canvas ref={cavasRef} />
    </Container>
  );
}
