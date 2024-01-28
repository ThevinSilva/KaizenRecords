import Title from './Title';
import svg from '../assets/enso.svg';
import styled from 'styled-components';


const IMAGE = styled.img`
  z-index: 50;
  height: 110%;
  position: absolute;
`

export default function Hero() {
  return (
    <>
      <Title>Kaizen</Title>
      <IMAGE src={svg} className='clock' />
    </>
  )
}
