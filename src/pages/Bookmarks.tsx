import { useEffect, useState } from 'react'

import { StyledSection } from '../components/DefaultStyledComponents'
import { IMovies, StyledMoviesList } from './Home'
import { Loading } from './Loading'
import { MovieCard } from '../components/MovieCard'
import { DescriptionShortener } from '../utils/DescriptionShortener'

export function Bookmarks() {
  const [movies, setMovies] = useState<IMovies[]>([
    {
      backdrop_path: '',
      id: 0,
      original_title: '',
      overview: '',
      poster_path: '',
      release_date: '',
      title: '',
    },
  ])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // prettier-ignore
    // TODO fix this statement, it are breaking all
    // const myList: IMovies[] = JSON.parse(localStorage.getItem('@primeflix_movies') ?? '')
    // setMovies(myList)

    setLoading(false)
  }, [])

  if (loading) return <Loading title="Bookmarks" />

  return (
    <StyledSection>
      <StyledMoviesList>
        {movies.length ? (
          movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                description={DescriptionShortener(movie.overview)}
                imageUrl={movie.poster_path}
                imageAlt={movie.original_title}
                readMoreLinkID={movie.id}
              />
            )
          })
        ) : (
          <h1 style={{ margin: 'auto' }}>
            Hey you haven't save any movies yet! 😥
          </h1>
        )}
      </StyledMoviesList>
    </StyledSection>
  )
}
