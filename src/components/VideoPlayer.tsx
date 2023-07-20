import styled from 'styled-components'
// https://www.youtube.com/watch?v={movieTrailer.key}

const StyledVideoWrapper = styled.div`
  display: grid;
  place-items: center;
  font-size: 2rem;
  background: #d3d3d3;
  aspect-ratio: 16/9;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`
interface IVideoPlayerProps {
  videoKey: string
}

export function VideoPlayer(props: IVideoPlayerProps) {
  return (
    <StyledVideoWrapper>
      <iframe
        id="player"
        itemType="text/html"
        src={`http://www.youtube.com/embed/${props.videoKey}`}
      ></iframe>
    </StyledVideoWrapper>
  )
}
