// Dark souls death screen
import styled from "styled-components";
import { motion } from "framer-motion";

// Sekiro death maybe ?

const Container = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 4rem;
`;

const Banner = styled(motion.div)`
  width: 100%;
  /* height: 8rem; */
  margin: 0 auto;
  color: red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: black;
  font-family: "Times New Roman", Times, serif !important;
  -webkit-box-shadow: 0px 0px 39px 44px rgba(0, 0, 0, 0.72);
  -moz-box-shadow: 0px 0px 39px 44px rgba(0, 0, 0, 0.72);
  box-shadow: 0px 0px 39px 44px rgba(0, 0, 0, 0.72);
  z-index: 50;

  span {
    padding-top: -1em;
    font-family: "Times New Roman", Times, serif !important;
  }
`;

const BlackScreen = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Grid = styled(motion.div)`
  /* position: absolute; */
  width: 100%;
  /* height: 100%; */
  margin: 0 auto;
  background-color: black;
  color: white;
  align-items: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
`;

const DeathScreen = styled(motion.div)`
  width: 100%;
`;

const Button = styled(motion.button)`
  all: unset;
  width: 10%;
  margin: 1%;
  font-size: 1rem;
  display: inline-block;
  position: relative;
  color: white;
  font-family: "Times New Roman", Times, serif !important;
  text-align: center; /* Ensure the text is centered horizontally */

  /* Adding vertical alignment with line-height for potential multiline support */
  /* Adjust the line-height or use padding for vertical centering if needed */

  /* Using pseudo-element for underline effect */
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white; /* Underline color */
    transform: scaleX(0);
    transform-origin: bottom right; /* Start the animation from the right */
    transition: transform 0.25s ease-out; /* Smooth transition for the effect */
  }

  /* Hover effect */
  &:hover:after {
    transform: scaleX(1); /* Scale the underline to full width on hover */
    transform-origin: bottom left; /* End the animation to the left */
  }
`;

// eslint-disable-next-line react/prop-types
export default function Death({ score, setState }) {
  return (
    <Container>
      <DeathScreen
        initial={{
          opacity: 1,
        }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <Banner
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            initial={{
              opacity: 0,
              scale: 1,
            }}
            animate={{ opacity: 0.7, scale: 1.4 }}
            transition={{ delay: 1, duration: 1 }}
          >
            YOU DIED
          </motion.span>
        </Banner>
      </DeathScreen>
      <BlackScreen
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
      >
        <h4>You scored {score} pts!</h4>
        <Grid
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 2 }}
        >
          <Button onClick={() => setState("reset")}>Try Again</Button>
          <Button>Submit Score</Button>
        </Grid>
      </BlackScreen>
    </Container>
  );
}
