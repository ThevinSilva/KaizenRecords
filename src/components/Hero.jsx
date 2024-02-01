import Title from './Title';
import svg from '../assets/enso.png';
import styled from 'styled-components';


const IMAGE = styled.img`
  z-index: 50;
  height: 110%;
  position: absolute;

  @media (max-width : 1200px){
    height: 80%;
  }

  @media (max-width : 500px){
    height: 60%;
  }
`

export default function Hero() {
  return (
    <>
      <Title>Kaizen</Title>
      <IMAGE src={svg} className='clock' />
    </>
  )
}
