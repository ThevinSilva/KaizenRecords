import styled from "styled-components";
import Socials from "./Socials";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Menu = styled(motion.footer)`
  position: absolute;
  display: flex;
  justify-content: center;
  top: calc(100% - ${(props) => props.height});
  height: ${(props) => props.height};
  width: 100%;
`;
export default function Footer() {
  const [isDesktop, setIsDesktop] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width : 768px)" });

  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);

  return (
    <Menu height={isDesktop ? "50px" : "35px"}>
      <Socials delay={1} />
    </Menu>
  );
}
