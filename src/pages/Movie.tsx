import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { API, API_KEY } from '../services/API'

import { Loading } from './Loading'
import {
  Buildings,
  Cake,
  RocketLaunch,
  Star,
  Tag,
  Warning,
  YoutubeLogo,
} from '@phosphor-icons/react'

const StyledHeader = styled.header`
  height: 33.2rem;
  background: #d3d3d3;
  position: relative;

  img.banner {
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
  }

  img.poster {
    max-width: 27.6rem;
    max-height: 41.6rem;
    position: absolute;
    right: 12.4rem;
    bottom: -18.6rem;
    outline: 0.4rem solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 2rem 3rem -1.5rem rgba(0, 0, 0, 0.75);
    border-radius: 0.8rem;
  }
`

const StyledSection = styled.section`
  padding: 8.4rem 14rem 32rem;
  margin: auto;
  color: #121214;

  h1 {
    display: block;
    font-weight: 900;
    font-size: 6rem;
    max-width: 53.2rem;
    line-height: 1.3;
    margin-bottom: 7.2rem;
  }

  .info {
    display: grid;
    grid-template-columns: 2fr 1fr;

    .left {
      padding-inline: 1.2rem;

      .buttons {
        display: flex;
        gap: 1.2rem;

        a {
          display: flex;
          gap: 1.2rem;
          align-items: center;
          padding: 1.8rem 2.4rem;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 1.2rem;
          cursor: pointer;
          background: transparent;
          border: 0.1rem solid #12121460;
          transition-property: color, background, border-color;
          transition-duration: 100ms;
          text-decoration: none;
          color: inherit;

          & svg {
            font-size: 1.8rem;
          }

          &.watch-trailer:hover {
            background: #ff0000;
            color: #e1e1e1;
            border-color: transparent;
          }

          &.save-favorites:hover {
            background: #ffd700;
            border-color: transparent;
          }
        }
      }

      p.movie-description {
        margin-top: 2rem;
        font-size: 1.8rem;
        line-height: 1.8;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      padding-inline: 1.2rem;
      gap: 1.6rem;

      .homepage-link {
        text-decoration: none;
        color: rgb(115, 120, 220);
        font-size: 2rem;
        text-align: center;
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }

      .tags {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        & > div {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          .tag {
            padding: 0.5rem 1.2rem;
            background: #eeeeee;
            border-radius: 999px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.4rem;
          }
        }
      }
    }
  }

  @media screen and (max-width: 425px) {
    padding: 2.4rem;
  }
`

const StyledReleasedTag = styled.section<{ $released?: boolean }>`
  padding: 0.5rem 1.2rem;
  background: ${(props) => (props.$released ? '#1DB954' : '#ff0000')};
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  color: ${(props) => (props.$released ? '#121214' : '#e1e1e1')};
`
const StyledRestrictionAge = styled(StyledReleasedTag)<{
  $adultOnly?: boolean
}>`
  background: ${(props) => (props.$adultOnly ? '#ff0000' : '#1DB954')};
  color: ${(props) => (props.$adultOnly ? '#e1e1e1' : '#121214')};
`

interface IMovie {
  adult: boolean
  backdrop_path: string
  genres: Array<{ id: number; name: string }>
  homepage: string
  id: number
  original_title: string
  overview: string
  poster_path: string
  production_companies: Array<{ id: number; name: string }>
  release_date: string
  status: string
}
export function Movie() {
  const { movieID } = useParams()
  const [movie, setMovie] = useState<IMovie>({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadMovie() {
      await API.get(`/movie/${movieID}`, {
        params: {
          api_key: API_KEY,
        },
      })
        .then((response) => {
          setMovie(response.data)
        })
        .catch(() => {
          console.log('Movie not founded bitch')
        })
    }

    loadMovie()
    setLoading(false)

    return () => {
      console.log('component was disassembled')
    }
  }, [])

  if (loading) return <Loading title="Movie" />

  console.log(movie)

  return (
    <>
      <StyledHeader>
        <img
          className="banner"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.original_title}
          draggable={false}
        />
        <img
          className="poster"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.original_title}
          draggable={false}
        />
      </StyledHeader>
      <StyledSection>
        <h1>{movie.original_title}</h1>
        <div className="info">
          <div className="left">
            <div className="buttons">
              <a href="#" className="watch-trailer">
                <YoutubeLogo weight="fill" />
                Watch Trailer
              </a>
              <a href="#" className="save-favorites">
                <Star weight="fill" />
                Save to favorites
              </a>
            </div>

            <p className="movie-description">{movie.overview}</p>
          </div>
          <div className="right">
            <a className="homepage-link" href={movie.homepage} target="_blank">
              Official Movie Website
            </a>
            <div className="genres tags">
              <span>Genres:</span>
              <div>
                {movie.genres?.map((genre) => {
                  return (
                    <span className="tag" key={genre.id}>
                      <Tag />
                      {genre.name}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="companies tags">
              <span>Production Companies:</span>
              <div>
                {movie.production_companies?.map((company) => {
                  return (
                    <span className="tag" key={company.id}>
                      <Buildings />
                      {company.name}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="release-date tags">
              <span>Release date:</span>
              <div>
                <span className="tag">
                  <Cake />
                  {movie.release_date}
                </span>
                <StyledReleasedTag
                  $released={movie.status === 'Released' ? true : false}
                >
                  <RocketLaunch />
                  {movie.status === 'Released' ? 'Released' : 'Not Released'}
                </StyledReleasedTag>
              </div>
            </div>
            <div className="restriction tags">
              <span>Age Restriction:</span>
              <div>
                <StyledRestrictionAge $adultOnly={movie.adult}>
                  <Warning />
                  {movie.adult ? 'Adults only' : 'Free for all'}
                </StyledRestrictionAge>
              </div>
            </div>
          </div>
        </div>
      </StyledSection>
    </>
  )
}
