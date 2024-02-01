import {styled , ThemeProvider} from "styled-components";
import theme from './theme.js';
import './styles.css'

import Hero from './components/Hero.jsx'
import Header from "./components/Header.jsx"
import Background from "./components/Background.jsx"
import Footer from './components/Footer.jsx'

const Centered = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column; // This will stack children vertically
  justify-content: center; // This will center children vertically in the container
  align-items: center; // This will center children horizontally in the container
  width: 100%;
  height: 90%; // This will take the full height of the viewport
  overflow: hidden;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Background/>
        <Header/>
          <Centered>
            <Hero/>
            {/* <ScrollDownIndicator/> */}
          </Centered>
      <Footer/>
    </ThemeProvider>
  )
}

export default App
