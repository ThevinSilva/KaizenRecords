import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { AddUserInLeaderboard } from "../../lib/game/database";
import Leaderboard from "./Leaderboard";

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

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }

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

  @media (max-width: 768px) {
    h4 {
      font-size: 2rem;
    } // Adjust font size for tablets
  }

  @media (max-width: 480px) {
    h4 {
      font-size: 1rem;
    } // Adjust font size further for mobile phones
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

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const Input = styled(motion.input)`
  all: unset;
  width: 60%; /* Adjust based on your design */
  margin: 1%;
  padding: 8px 16px;
  font-size: 1rem;
  color: white;
  background-color: #333; /* Dark background */
  border-bottom: 2px solid white; /* Underline style */
  text-align: center;
  @media (max-width: 768px) {
    font-size: 0.75rem;
    height: 10%; /* Adjust based on your design */
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const SubmitButton = styled(Button)`
  /* Reuse your existing Button styled component */
  width: 20%; /* Adjust based on your design */
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;

const Form = styled.div`
  width: 50%;
  height: 50%;
  border: 2px white solid;
  background: black;
  z-index: 300;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font: white;
    font-size: 2rem;
  }

  @media (max-width: 900px) {
    h3 {
      font-size: 0.8rem;
    }
  }
  @media (max-width: 768px) {
    h3 {
      font-size: 0.75rem;
    } // Adjust font size for tablets
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 0.5rem;
    } // Adjust font size further for mobile phones
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ErrorMessage = styled(motion.span)`
  color: #ff6347;
  margin-top: 1rem;
`;

// eslint-disable-next-line react/prop-types
export default function Death({ score, setState }) {
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [error, setError] = useState("");

  const validateUsername = (username) => {
    if (!username.trim()) return "Username cannot be empty.";
    if (username.length < 3)
      return "Username must be at least 3 characters long.";
    // Example pattern match (adjust as necessary): letters, numbers, and underscores only
    if (!/^\w+$/.test(username))
      return "Username must contain only letters, numbers, and underscores.";
    return ""; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateUsername(username);
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);
    const success = await AddUserInLeaderboard(username, score);
    setSubmitting(false);
    if (success) {
      console.log("Score submitted successfully");
      setShowLeaderboard(true); // Optionally, navigate to leaderboard or show a success message
    } else {
      setError("Failed to submit score. Please try again.");
    }
  };

  return (
    <Container>
      <DeathScreen
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <Banner
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 1 }}
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
        <Grid>
          <Button onClick={() => setState("reset")}>Try Again</Button>
          <Button onClick={() => setSubmitting(true)}>Submit Score</Button>
          <Button onClick={() => setShowLeaderboard(true)}>Leaderboard</Button>
        </Grid>
      </BlackScreen>
      {submitting && (
        <Form>
          <h3>SUBMIT YOUR SCORE</h3>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Grid>
              <SubmitButton type="submit">Submit</SubmitButton>
              <Button onClick={() => setSubmitting(false)}>Back</Button>
            </Grid>
          </form>
        </Form>
      )}
      {showLeaderboard && (
        <Leaderboard onClose={() => setShowLeaderboard(false)} />
      )}
    </Container>
  );
}
