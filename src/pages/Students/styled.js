import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StudentContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    margin-top: 10px;
  }

  div + div {
    border-top: 2px solid #b3b3b3;
  }

  span {
    font-size: 22px;
  }

  span#email {
    font-size: 20px;
  }
`

export const ProfilePicture = styled.div`
  img {
    width: 120px;
    height: 115px;
    border-radius: 50%;
  }
`
export const NewStudent = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
  font-weight: bold;
  font-size: 20px;
`
