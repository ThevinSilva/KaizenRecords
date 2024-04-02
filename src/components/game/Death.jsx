// Dark souls death screen
import styled from "styled-components";
import { motion } from "framer-motion";

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
  span {
    padding-top: -1em;
    font-family: "Times New Roman", Times, serif !important;
  }
`;

export default function Death() {
  return (
    <Container>
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
    </Container>
  );
}
