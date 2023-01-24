import styled from 'styled-components'
import * as colors from '../../config/colors'

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    margin-top: 5px;
    height: 0 10px;
    font-size: 22px;
    border: 2px solid #ddd;
    padding: 10px;
    border-radius: 7px;

    &:focus {
      border: 2px solid ${colors.primaryColor};
    }
  }
`
