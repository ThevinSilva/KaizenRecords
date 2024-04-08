import styled from "styled-components";
import TextPopUpAnimation from "../../lib/TextPopUpAnimation";

const start = (setState) => {
  setState("running");
};

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 8rem;

  // Responsive adjustments
  @media (max-width: 768px) {
    font-size: 4rem; // Smaller font for tablets and below
  }

  @media (max-width: 480px) {
    font-size: 2rem; // Even smaller font for mobile phones
  }
`;

// eslint-disable-next-line react/prop-types
export default function Title({ setState, gameManagerRef }) {
  return (
    <Container onClick={() => start(setState, gameManagerRef)}>
      <TextPopUpAnimation delay={20} stagger={0.2} offset={1}>
        Start
      </TextPopUpAnimation>
    </Container>
  );
}
