/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { motion } from "framer-motion";

const Title = styled.h2`
  font-size: inherit;
  font-family: ${(props) => props.theme.fonts.primary};
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
`;

const Character = styled(motion.span)`
  display: inline-block;
  font-family: "Roboto", sans-serif;
  font-weight: 600;
`;

export default function AnimatedTitle({
  children,
  delay = 0.2,
  stagger = 0.1,
  offset = 1,
}) {
  const text = String(children);

  const wordAnimation = (delay) => {
    return {
      hidden: { opacity: 0, x: `-${offset}em` },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          ease: [0.2, 0.65, 0.3, 0.9],
          // , // Apply initial delay here for the first child
          staggerChildren: stagger, // Apply stagger effect for children here
          delay: delay,
        },
      },
    };
  };

  // eslint-disable-next-line no-unused-vars
  const characterAnimation = {
    hidden: { opacity: 0, x: `-${offset}em` },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
        staggerChildren: stagger,
      },
    },
  };

  return (
    <Title aria-label={text} role="heading">
      {text.split(" ").map((word, wordIndex) => (
        <Word
          aria-hidden="true"
          key={wordIndex}
          initial="hidden"
          animate="visible"
          variants={wordAnimation(delay * wordIndex)}
        >
          {word === "KAIZEN" ? (
            <b style={{ color: "#ca0e25" }}>KAIZEN</b>
          ) : (
            word.split("").map((character, charIndex) => (
              <Character
                aria-hidden="true"
                key={`${wordIndex}-${charIndex}`} // Ensure unique keys
                variants={characterAnimation}
              >
                {character}
              </Character>
            ))
          )}
        </Word>
      ))}
    </Title>
  );
}
