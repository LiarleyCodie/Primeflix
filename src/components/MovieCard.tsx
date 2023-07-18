import { BookOpenText } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IMovieCardProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  readMoreLinkID: number;
}

const StyledArticle = styled.article`
  display: flex;
  position: relative;
  max-width: 27.6rem;
  max-height: 41.6rem;
  outline: 0.2rem solid transparent;

  box-shadow: 0 1rem 2rem -1rem transparent;

  transition-property: transform, box-shadow;
  transition-duration: 100ms;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &:hover,
  &:focus,
  &:focus-within {
    outline-color: #121214;
    z-index: 100;
    transform: scale(1.05);
    box-shadow: 0 1rem 2rem -0.5rem rgba(0, 0, 0, 1);
  }

  &:hover .movie-infos,
  &:focus .movie-infos,
  &:focus-within .movie-infos {
    opacity: 1;
    visibility: visible;
  }

  .movie-infos {
    opacity: 0;
    visibility: hidden;

    transition-property: opacity, visibility;
    transition-duration: 100ms;

    display: flex;
    flex-direction: column;
    justify-content: end;
    position: absolute;
    color: #e1e1e1;
    background: linear-gradient(to bottom, transparent, #121214 90%);
    width: 100%;
    height: 50%;
    left: 0;
    bottom: 0;

    strong {
      padding: 1.2rem;
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: 0.2rem;
    }

    a {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      background: #121214;
      color: #e1e1e1;
      text-decoration: none;
      padding: 1.2rem;

      svg {
        font-size: 1.8rem;
      }

      span {
        font-weight: 600;
        text-transform: uppercase;
        font-size: 1.2rem;
        letter-spacing: 0.2rem;
      }
    }
  }
`;

export function MovieCard(props: IMovieCardProps) {
  return (
    <StyledArticle tabIndex={0}>
      <div className="movie-infos">
        <strong>{props.title}</strong>

        <Link to={`/movie/${props.readMoreLinkID}`}>
          <BookOpenText />
          <span>Read more...</span>
        </Link>
      </div>
      <img
        loading="lazy"
        src={`https://image.tmdb.org/t/p/original/${props.imageUrl}`}
        alt={props.imageAlt}
        draggable={false}
      />
    </StyledArticle>
  );
}
