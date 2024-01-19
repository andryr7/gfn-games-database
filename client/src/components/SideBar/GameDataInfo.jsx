import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../utils/context";
import { colors } from "../../styles/stylevars";

const StyledGameDataInfo = styled.span`
  display: block;
  color: ${colors.grey};
`;

export default function GameDataInfo() {
  const { gameData, refinedData, metaData } = useContext(AppContext);
  const gameCount = gameData.length;
  const filteredGameCount = refinedData.length;
  const lastUpdate = new Date(metaData.lastUpdate).toLocaleDateString();

  return (
    <>
      <StyledGameDataInfo>
        {`Showing ${filteredGameCount} of ${gameCount} games`}
      </StyledGameDataInfo>
      <StyledGameDataInfo>{`Last update: ${lastUpdate}`}</StyledGameDataInfo>
    </>
  );
}
