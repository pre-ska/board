import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
// import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

const CoinsGridStyled = styled.div`
  display: grid;
  /* grid-template-columns: repeat(5, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

function getLowerSectionCoins(filteredCoins, coinList) {
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100)
  );
}

const getCoinsToDisplay = (coinList, topSection, favorites, filteredCoins) => {
  return topSection ? favorites : getLowerSectionCoins(filteredCoins, coinList);
};

export default ({ topSection }) => {
  const { coinList, favorites, filteredCoins } = React.useContext(AppContext);

  return (
    <CoinsGridStyled>
      {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(
        coinKey => (
          <CoinTile topSection={topSection} key={coinKey} coinKey={coinKey} />
        )
      )}
    </CoinsGridStyled>
  );
};
