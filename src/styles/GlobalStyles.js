import styled, { createGlobalStyle } from 'styled-components'
import * as colors from '../config/colors'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  h1 {
    text-align: center;
    font-size: 30px;
  }

  button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 22px;
    transition: all 300ms;
  }

  button:hover {
    filter: brightness(75%);
  }

  a {
    text-decoration: none;
    color: ${colors.primaryColor};
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--success{
    background: ${colors.successColor};
    color: #000;
    font-weight: bold;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error{
    background: ${colors.errorColor};
    color: #000;
    font-weight: bold;
  }
 `

export const Container = styled.section`
  max-width: 860px;
  background: #fff;
  margin: 30px auto;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
`
