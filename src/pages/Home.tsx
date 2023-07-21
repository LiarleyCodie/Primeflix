import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { API, API_KEY } from '../services/API'

import { StyledSection } from '../components/DefaultStyledComponents'
import { MovieCard } from '../components/MovieCard'
import { Loading } from './Loading'
import { DescriptionShortener } from '../utils/DescriptionShortener'

export interface IMovies {
  backdrop_path: string
  id: number
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
}

export const StyledMoviesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.2rem;

  @media screen and (max-width: 425px) {
    flex-wrap: nowrap;
    flex-direction: column;
    max-width: max-content;
    margin-inline: auto;
  }
`

export function Home() {
  const [movies, setMovies] = useState<IMovies[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadMovies() {
      const response = await API.get('movie/now_playing', {
        params: {
          api_key: API_KEY,
          page: 1,
        },
      })

      setMovies(response.data.results.splice(0, 10))
      setLoading(false)
    }
    loadMovies()
  }, [])

  if (loading) return <Loading title="Movies List" />

  return (
    <StyledSection>
      <StyledMoviesList>
        {movies.map((movie) => {
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
        })}
      </StyledMoviesList>
    </StyledSection>
  )
}
