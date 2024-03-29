import { FaDiscord, FaInstagram, FaSpotify, FaTiktok } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import links from "../links";

const SocialLink = styled(motion.a)`
  margin: 0 10px;
  color: #ffffff; // Change as needed
`;

const SocialsContainer = styled.div`
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const LINKS = (size) => [
  { icon: <FaInstagram size={size} />, url: links.instagram },
  { icon: <FaDiscord size={size} />, url: links.discord },
  { icon: <FaTiktok size={size} />, url: links.tiktok },
  { icon: <FaSpotify size={size} />, url: links.spotify },
];

const containerVariants = (delay) => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger the child animations
        delayChildren: delay,
      },
    },
  };
};

const itemVariants = (offset = 2) => {
  return {
    hidden: {
      opacity: 0,
      x: `-${offset}em`,
    },
    visible: {
      opacity: 1,
      x: `0em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };
};

// eslint-disable-next-line react/prop-types
const Socials = ({ delay }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width : 768px)" });

  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);
  return (
    <SocialsContainer
      as={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants(delay)}
    >
      {LINKS(isDesktop ? 30 : 20).map(({ icon, url }, index) => (
        <SocialLink
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants()}
          whileHover={{
            scale: 1.1,
            color: "#ca0e25",
          }}
          whileTap={{
            scale: 0.9,
            color: "#ca0e25",
          }}
        >
          {icon}
        </SocialLink>
      ))}
    </SocialsContainer>
  );
};

export default Socials;
