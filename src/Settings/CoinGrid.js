import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";
import CoinTile from "./CoinTile";

const CoinsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`;

const getCoinsToDisplay = (coinsList, topSection) => {
  return Object.keys(coinsList).slice(0, topSection ? 10 : 100);
};

export default ({ topSection }) => {
  return (
    <AppContext.Consumer>
      {({ coinsList }) => (
        <CoinsGridStyled>
          {getCoinsToDisplay(coinsList, topSection).map(coinKey => (
            <CoinTile topSection={topSection} key={coinKey} coinKey={coinKey} />
          ))}
        </CoinsGridStyled>
      )}
    </AppContext.Consumer>
  );
};
