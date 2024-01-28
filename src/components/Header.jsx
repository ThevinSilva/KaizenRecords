import Socials from "./Socials"
import styled from "styled-components" 
import Button from "../lib/Button"
import {motion} from "framer-motion"

const Menu = styled.div`
    position: relative;
    height: 12%;
    display: flex;
    justify-content: space-between;
    margin: 0.75% 2%;

`

const Section = styled(motion.div)`
    display: flex;
`

export default function Header() {
  return (
    <Menu>
        <Socials/>
        <Section>
            <Button delay={1}>
                SIGN UP
            </Button>
            <Button delay={1}>
                LOGIN
            </Button>
        </Section>
    </Menu>
  )
}
