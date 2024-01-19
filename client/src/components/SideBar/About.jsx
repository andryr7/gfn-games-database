import styled from "styled-components";
import { colors } from "../../styles/stylevars";

const StyledAboutBlock = styled.a`
  display: block;
  margin-top: auto;
  &:hover {
    color: ${colors.green};
  }
`;

export default function About() {
  return (
    <StyledAboutBlock href="https://andryratsimba.com">About</StyledAboutBlock>
  );
}
