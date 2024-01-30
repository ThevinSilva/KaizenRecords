import { FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

const SocialLink = styled(motion.a)`
  margin: 0 10px;
  color: #ffffff; // Change as needed
`;

const SocialsContainer = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
`;

const LINKS = (size) => [
  { icon: <FaTwitter size={size} />, url: "https://twitter.com/yourusername" },
  { icon: <FaDiscord size={size} />, url: "https://discord.com/users/youruserid" },
  { icon: <FaInstagram size={size} />, url: "https://instagram.com/yourusername" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger the child animations
    },
  },
};

const itemVariants = {
  hidden: { y: -50, x:-40, opacity:0 },
  visible: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: "ease",
      duration: 0.5,
    },
  },
};

const Socials = () => {
  const [isDesktop , setIsDesktop] = useState(false)
  const desktop = useMediaQuery({ query : "(min-width : 768px)"})

  useEffect(() => {
    setIsDesktop(desktop) 
  },[desktop])
  return (
    <SocialsContainer as={motion.div} initial="hidden" animate="visible" variants={containerVariants}>
      {LINKS(isDesktop ? 30 : 20).map(({ icon, url }, index) => (
        <SocialLink
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          whileHover={{
            scale:1.1,
            color: "#ca0e25",
          }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </SocialLink>
      ))}
    </SocialsContainer>
  );
};

export default Socials;
