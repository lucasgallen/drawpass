import styled, { createGlobalStyle } from 'styled-components';
import Range from './range';

const AppContainer = styled.div`
  align-items: center;
  display: flex;
  min-height: ${props => `calc(100vh - 1rem - ${props.headerHeight} - ${props.footerHeight})`};
  padding-top: 1rem;
`;

const Global = createGlobalStyle`
  html, body {
    background-color: ${props => props.backgroundColor};
    font-family: sans-serif;
    font-size: 10px;
  }
`;

const Button = styled.button`
  background-color: #fff;
  border: 2px solid #000;
  color: #000;
  cursor: pointer;
  display: inline-block;
  float: ${props => props.side};
  font-size: 1.3rem;
  padding: 1rem;
  text-decoration: none;
  text-transform: uppercase;

  &:hover:not(:disabled) {
    color: ${props => props.hoverColor || 'white'};
    background: ${props => props.hoverBackground || 'black'};
  }

  &:disabled {
    cursor: default;
    filter: opacity(0.5);
  }
`;

const Label = styled.label`
  border-bottom: 2px solid fuchsia;
  border-right: 2px solid fuchsia;
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  margin: 0.5rem 1rem 0;
  padding: 0 0.4rem 0.2rem 0;
  position: relative;
  text-transform: uppercase;
  vertical-align: top;

  &::before {
    background-color: black;
    border-radius: 1rem;
    content: '';
    display: block;
    height: 0.3rem;
    position: absolute;
    top: 0.25rem;
    right: -1rem;
    width: 0.3rem;
  }

  &::after {
    background-color: black;
    border-radius: 1rem;
    content: '';
    display: block;
    height: 0.3rem;
    position: absolute;
    right: -1rem;
    top: 1rem;
    width: 0.3rem;
  }
`;

const Link = styled.a`
  border-bottom: 2px solid blue;
  color: blue;
  cursor: pointer;
  margin: 0 0.5rem 0;
`;

const Input = styled.input`
  border: 2px solid cadetblue;
  display: inline-block;
  font-size: 1.5rem;
  padding: 0.25rem;
  margin: 0 0.5rem;
  width: ${props => props.width || '7rem'};
`;

export {
  Global,
  AppContainer,
  Button,
  Label,
  Link,
  Input,
  Range,
};
