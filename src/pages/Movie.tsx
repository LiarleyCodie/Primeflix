import { useParams } from "react-router-dom";
import { StyledSection } from "../components/DefaultStyledComponents";

export function Movie() {
  const { movieID } = useParams();

  return (
    <StyledSection>
      <span>Filme: {movieID}</span>
    </StyledSection>
  );
}
