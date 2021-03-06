import styled from 'styled-components';
import { movingStripes } from '/app/components/styles/keyframes';

const ContainerGrid = styled.div`
  align-items: center;
  display: grid;
  margin: 0 auto;
  max-width: 25rem;
  height: 12.5rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 18.4rem;
  justify-content: center;
  margin-bottom: 2rem;
  vertical-align: bottom;

  @media (min-width: 700px) {
    display: inline-flex;
    padding-left: 8rem;
  }
`;

const Copy = styled.p`
  float: left;
  font-size: 2rem;
  grid-column-start: 1;
  grid-column-end: 2;
  text-transform: lowercase;
`;

const Button = styled.button`
  animation-name: ${props => props.loadingSession ? movingStripes('-11.2rem') : ''};
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  background: black;
  ${props => {
    if (!props.loadingSession) return;
    return `
      background: repeating-linear-gradient(
        45deg,
        black,
        black 1rem,
        cadetblue 1rem,
        cadetblue 2rem
      );
      pointer-events: none;
    `;
  }}
  background-size: 24rem;
  box-shadow: 0px -3px 0px 0px aquamarine inset;
  color: white;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 1.5rem;
  grid-column-start: 2;
  line-height: 2rem;
  margin-left: 1rem;
  padding: 1rem;
  ${props => props.loading ? 'pointer-events: none;' : ''}
  text-transform: uppercase;

  &:hover {
    background: white;
    color: black;
  }
`;

const Divider = styled.span`
  grid-column-start: 1;
  grid-column-end: 3;
  margin: 0 16rem 0 1rem;

  @media (min-width: 700px) {
    border-bottom: 1px solid black;
  }
`;

export {
  ContainerGrid,
  Container,
  Copy,
  Button,
  Divider,
};
