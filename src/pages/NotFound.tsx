import { StyledSection } from '../components/DefaultStyledComponents'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledErrorTexts = styled.div`
  font-size: 4rem;
  text-align: center;

  h1 {
    line-height: 1;
    strong {
      font-weight: 700;
    }
    display: block;
    margin-block: 2rem;
  }

  a {
    display: block;
    background: #121214;
    color: #e1e1e1;
    padding: 1.2rem 2rem;
    text-decoration: none;
    margin-top: 4rem;
    width: max-content;
    margin-inline: auto;
    &:hover {
      opacity: 0.9;
    }
  }
`

export function NotFound() {
  return (
    <StyledSection>
      <StyledErrorTexts>
        <h4>Oh no! 😢</h4>
        <h1>
          <strong>404</strong>
          <br />
          Nothing was found!
        </h1>
        <Link to="/">Go to home</Link>
      </StyledErrorTexts>
    </StyledSection>
  )
}
