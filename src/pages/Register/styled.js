import styled from 'styled-components'
import * as colors from '../../config/colors'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  font-size: 22px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    font-size: 22px;
    border: 2px solid #ddd;
    padding: 10px;
    border-radius: 7px;
    margin-top: 5px;

    &:focus {
      border: 2px solid ${colors.primaryColor};
    }
  }
`
