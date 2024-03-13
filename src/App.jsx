import { styled, ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import theme from "./theme.js";
import "./styles.css";

import Hero from "./components/Hero.jsx";
import Header from "./components/Header.jsx";
import Background from "./components/Background.jsx";
import Footer from "./components/Footer.jsx";
import About from "./components/About.jsx";

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Background />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Centered>
                <Hero />
              </Centered>
            }
          />
          <Route path="/about" element={<About />} />
          {/* Define more routes as needed */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
