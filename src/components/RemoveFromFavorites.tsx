import { X } from '@phosphor-icons/react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  padding: 1.8rem 2.4rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.4rem;
  cursor: pointer;
  background: transparent;
  border: 0.1rem solid #12121460;
  transition-property: color, background, border-color;
  transition-duration: 100ms;
  text-decoration: none;
  color: inherit;

  & svg {
    font-size: 2.4rem;
  }

  &:hover {
    background: #ff0000;
    border-color: transparent;
    color: #e1e1e1;
  }
`

// prettier-ignore
export function RemoveFromFavorites({removeFavoritedMovie}: {removeFavoritedMovie: () => void}) {
  return (
    <StyledButton onClick={removeFavoritedMovie}>
      <X />
      <span>
        Remove from Favorites
      </span>
    </StyledButton>
  )
}
