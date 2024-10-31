import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}

  :root {
    --blue-50: '#ecf1f6',
    --blue-100: '#b2cbe9',
    --blue-200: '#8bb2df',
    --blue-300: '#6498d4',
    --blue-400: '#3e7ec9',
    --blue-500: '#1764be',
    --blue-600: '#13539e',
    --blue-700: '#0f437f',
    --blue-800: '#0c325f',
    --blue-900: '#08213f',
    --red-50: '#F7EBEB',
    --red-100: '#F2D4D4',
    --red-200: '#f2a4a4',
    --red-300: '#ee8686',
    --red-400: '#e96767',
    --red-500: '#e54949',
    --red-600: '#bf3d3d',
    --red-700: '#993131',
    --red-800: '#732525',
    --red-900: '#4c1818',
    --gray-50: '#F7F7F8',
    --gray-100: '#CFD5D7',
    --gray-200: '#AAB3B6',
    --gray-300: '#929B9F',
    --gray-400: '#70787B',
    --gray-500: '#5B666A',
    --gray-600: '#4C5555',
    --gray-700: '#353c3f',
    --gray-800: '#282828',
    --gray-900: '#1b1b1b',
    --snorkeling: '#A500E6',
    --diving: '#1ACAE1',
    --swimming: 'FF7B00',
    --scuba-diving: '#00AE85',
    --surfing: '#EC0779',
    --sunset: '#F5C800',
    --snap: '#1BE900',
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }

  span {
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  input, textarea, button {
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

export default GlobalStyles;
