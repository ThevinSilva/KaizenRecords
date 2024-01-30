import Socials from "./Socials"
import styled from "styled-components" 
import Button from "../lib/Button"
import {motion} from "framer-motion"
import links from "../links"

const Menu = styled.div`
    position: relative;
    height: 40px;
    display: flex;
    justify-content: space-between;
    margin: 3px 2%;

    @media (max-width: 768px) {
        height: 26px;
        margin: 3px 1%;
    }
`

const Section = styled(motion.div)`
    display: flex;
`

export default function Header() {
  return (
    <Menu>
        <Socials/>
        <Section>
            <Button link={links.signup} delay={1}>
                SIGN UP
            </Button>
            <Button link={links.login} delay={1}>
                LOGIN
            </Button>
        </Section>
    </Menu>
  )
}
