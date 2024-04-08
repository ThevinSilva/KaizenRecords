import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GetLeaderboard } from "../../lib/game/database";

const LeaderBoardContainer = styled(motion.div)`
  width: 50%;
  height: 80%;
  border: 2px white solid;
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 600;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.65rem;
  }

  @media (max-width: 480px) {
    font-size: 0.45rem;
  }

  ol {
    width: 50%;
    height: 60%;
    overflow-y: auto;
  }
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

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const Item = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

// eslint-disable-next-line react/prop-types
export default function Leaderboard({ onClose }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    GetLeaderboard().then((data) => {
      setData(data);
      console.log(data);
    });
  }, []);

  return (
    <LeaderBoardContainer>
      <h4>Leaderboard</h4>
      <ol>
        {data.map((value, index) => (
          <motion.li
            key={index}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Item>
              <span>{value.username}</span>
              <span>{value.score}</span>
            </Item>
          </motion.li>
        ))}
      </ol>
      <Grid>
        <Button onClick={onClose}>back</Button>
      </Grid>
    </LeaderBoardContainer>
  );
}
