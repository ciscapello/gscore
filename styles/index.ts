import { createGlobalStyle } from "styled-components";
export { Color } from "./colors";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #000;
    color: white;
    font-family: "thicccboi", sans-serif;
  }

  @font-face {
    font-family: 'thicccboi';
    src: url('/fonts/thicccboi/THICCCBOI-Medium.woff2'),
      url('/fonts/thicccboi/THICCCBOI-Bold.woff2');
  }
`;
