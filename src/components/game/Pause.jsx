import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { GetLeaderboard } from "../../lib/game/database";

const Container = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const Option = styled(motion.li)`
  list-style: none;
  cursor: pointer;
  position: relative;
  padding: 8px 16px;
  overflow: hidden; // Ensure the highlight does not overflow
`;

const Highlight = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.accent};
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 5px;
`;

const LeaderBoard = styled(motion.div)`
  position: absolute;
  left: 70%;
  width: 30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centers content horizontally */

  h4 {
    text-align: center; /* Correct property to center text */
    width: 100%; /* Ensures the text-align property has an effect */
    padding: 1%;
  }

  ol {
    width: 100%;
  }
`;

const Item = styled(motion.div)`
  display: flex;
  justify-content: space-around;
`;

// eslint-disable-next-line react/prop-types
export default function Pause({ setState }) {
  const [hovered, setHovered] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    GetLeaderboard().then((data) => setData(data));
  });

  const options = {
    resume: () => setState("running"),
    controls: () => {
      console.log("controls");
    },
    restart: () => {
      // togglePause(setState);
      setState("reset");
      // setState("running");
    },
  };

  return (
    <Container
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      <h2>Pause</h2>
      <ul>
        {Object.keys(options).map((key) => (
          <Option
            key={key}
            onHoverStart={() => setHovered(key)}
            onHoverEnd={() => setHovered(null)}
            onClick={options[key]}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {hovered === key && <Highlight layoutId="highlight" />}
            {key}
          </Option>
        ))}
      </ul>
      <LeaderBoard>
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
      </LeaderBoard>
    </Container>
  );
}
