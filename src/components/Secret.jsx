import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import GameManager from "../lib/game/game";

// Game UI 
import Stats from "./game/Stats"

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
    width : ${props => props.canvasSize.width}px;
    height : ${props => props.canvasSize.height}px;
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    /* max-height: 100%; */
   z-index: 100;
`

export default function About() {
  const isDesktop = useMediaQuery({ query: "(min-width : 768px)" });
  const ref = useRef(null);
  const [score, setScore] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 500 });
  

  useEffect(() => {
    const canvas = ref.current;
    const gameManager = new GameManager(canvas, setScore);
    

    const updateCanvasSize = () => {
      if (canvas) {
        setCanvasSize({
          width: canvas.clientWidth,
          height: canvas.clientHeight
        });
      }
    };

    updateCanvasSize(); // Initial update

    // Adjust canvas size on window resize
    window.addEventListener('resize', updateCanvasSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateCanvasSize);

    

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
      <GameUI canvasSize={canvasSize}>
        <Stats score={score}/>
        {/* NOTE : odometer needs leading zeroes and flash a few times on the screen every certain mile stone */}
      </GameUI>

      <canvas ref={ref} />
    </Container>
  );
}