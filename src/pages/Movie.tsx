import { useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledSection } from "../components/DefaultStyledComponents";

export function Movie() {
  const { movieID } = useParams();

  return (
    <StyledSection>
      <span>Filme: {movieID}</span>
    </StyledSection>
  );
}
