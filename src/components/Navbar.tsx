import styled from 'styled-components'
import { NavLink, Link } from 'react-router-dom'

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 8rem;
  background: #121214;
  color: #e1e1e1;

  a {
    text-decoration: none;
    color: inherit;
    position: relative;

    &:nth-child(1) {
      font-weight: 400;
      font-size: 2.4rem;
      letter-spacing: 0.2rem;

      & strong {
        font-weight: 700;
      }
    }

    &:nth-child(2) {
      display: block;
      color: inherit;
      width: 12rem;
      text-align: center;
      padding-block: 0.8rem;
      transition: opacity 100ms;
      overflow: hidden;

      &::after {
        content: '';
        width: 100%;
        height: 0.4rem;
        background: #e1e1e1;
        position: absolute;
        left: 0;
        bottom: 0;
        opacity: 0;
        transition:
          opacity 100ms,
          transform 300ms;
        transform: translateX(100%);
      }

      &.active::after {
        opacity: 1;
        transform: translateY(0);
      }

      &:not(.active):hover {
        opacity: 0.7;
      }
    }
  }
`

export function Navbar() {
  return (
    <StyledNavbar>
      <Link to="/">
        Prime<strong>Flix</strong>
      </Link>
      <NavLink to="/bookmarks">My Movies</NavLink>
    </StyledNavbar>
  )
}
