import styled from "styled-components";
import Socials from "./Socials";
import Button from "../lib/Button";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import links from "../links";

const Menu = styled(motion.footer)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  margin: 3px 50px;
  top: calc(100% - ${(props) => props.height} - 8px);
  height: ${(props) => props.height};
  width: calc(100% - 100px);
`;
export default function Footer() {
  const [isDesktop, setIsDesktop] = useState(false);
  const desktop = useMediaQuery({ query: "(min-width : 768px)" });

  useEffect(() => {
    setIsDesktop(desktop);
  }, [desktop]);

  return (
    <Menu height={isDesktop ? "50px" : "35px"}>
      <Button link={"/about"} internal delay={1}>
        ABOUT
      </Button>
      <Socials delay={1} />
      <Button link={"/secret"} internal delay={1}>
        SECRET
      </Button>
    </Menu>
  );
}
