import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
// import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

const CoinsGridStyled = styled.div`
  display: grid;
  /* grid-template-columns: repeat(5, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

function getLowerSectionCoins(filteredCoins, coinsList) {
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinsList).slice(0, 100)
  );
}

const getCoinsToDisplay = (coinsList, topSection, favorites, filteredCoins) => {
  return topSection
    ? favorites
    : getLowerSectionCoins(filteredCoins, coinsList);
};

export default ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinsList, favorites, filteredCoins }) => (
        <CoinsGridStyled>
          {getCoinsToDisplay(
            coinsList,
            topSection,
            favorites,
            filteredCoins
          ).map(coinKey => (
            <CoinTile topSection={topSection} key={coinKey} coinKey={coinKey} />
          ))}
        </CoinsGridStyled>
      )}
    </AppContext.Consumer>
  );
};
