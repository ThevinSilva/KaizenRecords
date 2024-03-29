import styled from "styled-components";
import TextStaggerAnimation from "../lib/TextStaggerAnimation";
import { useMediaQuery } from "react-responsive";
import { Textfit } from "new-react-textfit";

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

  div > div > h2 {
    margin: 0 0 20px 0;
    width: 100%;
    height: 40%;
    text-align: left;
    word-wrap: break-word; // Prevents overflow by breaking long words
  }
`;

export default function About() {
  const isDesktop = useMediaQuery({ query: "(min-width : 768px)" });

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
    >
      <Textfit style={{ height: "100%", width: "100%" }} mode="multi">
        <TextStaggerAnimation>
          Rooted in the Japanese philosophy of KAIZEN (改善) meaning 'continuous
          improvement'.
        </TextStaggerAnimation>
        <TextStaggerAnimation>
          High-performance marketing. Full ownership rights for artists. No
          Bullsh*t.
        </TextStaggerAnimation>
      </Textfit>
    </Container>
  );
}
