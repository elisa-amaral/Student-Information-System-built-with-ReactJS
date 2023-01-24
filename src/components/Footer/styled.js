import styled from 'styled-components'

export const Container = styled.footer`
  margin-top: 5px;
  cursor: pointer;
  padding: 30px;

  p {
    color: #fff;
    text-align: center;
    font-size: 25px;
    margin: 0;
    padding: 2px;
    font-weight: 700;
  }

  a {
    text-decoration: underline;
    color: #26f601;
  }

  a:hover {
    color: cyan;
    transition: 300ms ease-in-out;
  }

  .heart-entity {
    font-size: 27px;
    color: #ff0000;
  }
`
