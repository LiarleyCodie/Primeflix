import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { API, API_KEY } from '../services/API'

import { Loading } from './Loading'
import { Buildings, Cake, Notebook, RocketLaunch, Tag, Warning } from '@phosphor-icons/react' // prettier-ignore
import { VideoPlayer } from '../components/VideoPlayer'
import { SaveToFavorites } from '../components/SaveToFavorites'
import { RemoveFromFavorites } from '../components/RemoveFromFavorites'

const StyledHeader = styled.header`
  height: 61.6rem;
  background: #d3d3d3;
  position: relative;

  .banner {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    object-fit: cover;
  }

  @media screen and (max-width: 425px) {
    height: 42.8rem;

    img.poster {
      max-width: 18rem;
      max-height: 27.2rem;
      inset: 0;
      margin: auto;
    }
  }
`
//#region
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
    margin-bottom: 3.2rem;
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

          &.official-movie-homepage:hover {
            background: rgb(115, 120, 220);
            color: #e1e1e1;
            border-color: transparent;
          }
        }
      }

      p.movie-description {
        margin-block: 3.2rem;
        font-size: 2.4rem;
        line-height: 1.8;
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      padding: 1.6rem;
      gap: 1.6rem;
      border: 1px solid #eeeeee;
      height: max-content;

      .additional-infos {
        font-size: 2rem;
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
            width: max-content;
          }
        }
      }
    }
  }

  @media screen and (max-width: 425px) {
    padding: 3.2rem 2.4rem;

    h1 {
      font-size: 4.8rem;
      text-align: center;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .left {
        .buttons {
          flex-direction: column;

          a,
          button {
            display: flex;
            padding: 1.4rem 2rem;
            font-size: 1.2rem;
            & svg {
              font-size: 3rem;
            }

            & span {
              font-weight: 600;
              margin-inline: auto;
            }
          }
        }

        p.movie-description {
          font-size: 1.6rem;
          line-height: 1.8;
        }
      }

      .right {
        .additional-infos {
          font-size: 1.8rem;
          font-weight: 600;
        }
      }
    }
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
// prettier-ignore
const StyledRestrictionAge = styled(StyledReleasedTag)<{  $adultOnly?: boolean }>`
  background: ${(props) => (props.$adultOnly ? '#ffbb00' : '#1DB954')};
  color: #121214;
`

interface IMovieData {
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
interface IMovieTrailer {
  name: string
  key: string
  site: string
  id: string
  type: string
}
//#endregion
export function Movie() {
  //#region
  const { movieID } = useParams()
  const [movieData, setMovieData] = useState<IMovieData>({
    adult: false,
    backdrop_path: '',
    genres: [{ id: 0, name: '' }],
    homepage: '',
    id: 0,
    original_title: '',
    overview: '',
    poster_path: '',
    production_companies: [{ id: 0, name: '' }],
    release_date: '',
    status: '',
  })
  const [movieTrailer, setMovieTrailer] = useState<IMovieTrailer[]>([
    {
      id: '',
      key: '',
      site: '',
      name: '',
      type: '',
    },
  ])
  const [loading, setLoading] = useState<boolean>(true)
  const [movieIsInFavorites, setMovieIsInFavorites] = useState<boolean>(false)

  useEffect(() => {
    async function loadMovieData() {
      await API.get(`/movie/${movieID}`, {
        params: {
          api_key: API_KEY,
        },
      })
        .then((response) => {
          setMovieData(response.data)
        })
        .catch((err) => {
          console.log('[Movie data was not found]')
          console.error(err)
          return
        })
    }

    async function loadMovieTrailer() {
      await API.get(`/movie/${movieID}/videos`, {
        params: {
          api_key: API_KEY,
        },
      })
        .then((response) => {
          setMovieTrailer(response.data.results)
        })
        .catch((err) => {
          console.log('[Movie trailer data was not found]')
          console.error(err)
        })
    }

    loadMovieData()
    loadMovieTrailer()
    setLoading(false)

    return () => movieWasFavorite()
  }, [])

  function getMovieTrailerID(movies: IMovieTrailer[]): number {
    let movieID: number = 0
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].type?.toUpperCase() === 'TRAILER') {
        movieID = i
        break
      }
    }
    return movieID
  }

  function favoriteMovie(): void {
    // prettier-ignore
    // @ts-ignore
    const moviesList: IMovieData[] = JSON.parse(localStorage.getItem('@primeflix_movies')) || []
    moviesList.push(movieData)
    localStorage.setItem('@primeflix_movies', JSON.stringify(moviesList))

    setMovieIsInFavorites(true)
    toast.success('Movie added to your favorites')
  }

  function unfavoriteMovie(): void {
    // prettier-ignore
    const savedMoviesList: IMovieData[] = JSON.parse(localStorage.getItem('@primeflix_movies') ?? '')

    const updatedMoviesList = savedMoviesList.filter(
      (movie) => movie.id !== movieData.id,
    )
    localStorage.setItem('@primeflix_movies', JSON.stringify(updatedMoviesList))

    setMovieIsInFavorites(false)
    toast.success('Movie removed from your favorites')
  }

  function movieWasFavorite() {
    // @ts-ignore
    // prettier-ignore
    const savedMoviesList: IMovieData[] | null = JSON.parse(localStorage.getItem('@primeflix_movies'))
    if (savedMoviesList) {
      setMovieIsInFavorites(
        savedMoviesList.some((movie) => movie.id === Number(movieID)),
      )
    }
  }

  if (loading) return <Loading title="Movie" />
  //#endregion
  return (
    <>
      <StyledHeader>
        <img
          className="banner"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`}
          alt={movieData.original_title}
          draggable={false}
        />
        <img
          className="poster"
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w400${movieData.poster_path}`}
          alt={movieData.original_title}
          draggable={false}
        />
      </StyledHeader>

      <StyledSection>
        <h1>{movieData.original_title}</h1>
        <div className="info">
          <div className="left">
            <div className="buttons">
              <a
                href={movieData.homepage}
                className="official-movie-homepage"
                target="blank"
              >
                <Notebook weight="fill" />
                <span>Official Movie Homepage</span>
              </a>
              {movieIsInFavorites ? (
                <RemoveFromFavorites removeFavoritedMovie={unfavoriteMovie} />
              ) : (
                <SaveToFavorites favoriteMovie={favoriteMovie} />
              )}
            </div>

            <p className="movie-description">{movieData.overview}</p>

            {!loading && (
              <VideoPlayer
                videoKey={movieTrailer[getMovieTrailerID(movieTrailer)].key}
              />
            )}
          </div>
          <div className="right">
            <p className="additional-infos">Additional Informations:</p>
            <div className="genres tags">
              <span>Genres:</span>
              <div>
                {movieData.genres?.map((genre) => {
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
                {movieData.production_companies?.map((company) => {
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
                  {movieData.release_date}
                </span>
                <StyledReleasedTag
                  $released={movieData.status === 'Released' ? true : false}
                >
                  <RocketLaunch />
                  {movieData.status === 'Released'
                    ? 'Released'
                    : 'Not Released'}
                </StyledReleasedTag>
              </div>
            </div>
            <div className="restriction tags">
              <span>Age Restriction:</span>
              <div>
                <StyledRestrictionAge $adultOnly={movieData.adult}>
                  <Warning />
                  {movieData.adult ? 'Adults only' : 'Free for all'}
                </StyledRestrictionAge>
              </div>
            </div>
          </div>
        </div>
      </StyledSection>
    </>
  )
}
