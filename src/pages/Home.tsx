import { useEffect, useState } from 'react'

import { API, API_KEY } from '../services/API'

import { StyledSection } from '../components/DefaultStyledComponents'
import { MovieCard } from '../components/MovieCard'
import styled from 'styled-components'

interface IMovies {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

const StyledMoviesList = styled.div`
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

function DescriptionShortener(description: string): string {
  let text: string[] = description
    .split('')
    .slice(0, 147)
    .join('')
    .trim()
    .split('')

  for (let i = 0; i < 3; i++) {
    text[text.length - 3 + i] = '.'
  }
  return text.join('')
}

export function Home() {
  const [movies, setMovies] = useState<IMovies[]>([])

  useEffect(() => {
    async function loadMovies() {
      const response = await API.get('movie/now_playing', {
        params: {
          api_key: API_KEY,
          page: 1,
        },
      })

      console.log(movies)
      setMovies(response.data.results.splice(0, 10))
    }
    loadMovies()
  }, [])

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
