import styled from 'styled-components'
import { StyledSection } from '../components/DefaultStyledComponents'

const StyledLoadingText = styled.h1`
  font-size: 2.8rem;
  animation: loading 2s ease infinite;

  @keyframes loading {
    50% {
      opacity: 0.4;
    }
  }
`

interface ILoadingProps {
  title: string
}

export function Loading({ title }: ILoadingProps) {
  return (
    <StyledSection>
      <StyledLoadingText style={{ textAlign: 'center' }}>
        Loading {title}...
      </StyledLoadingText>
    </StyledSection>
  )
}
