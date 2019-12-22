import React from "react";
import { AppContext } from "../App/AppProvider";
import { SelectableTile, DeletableTile, DisabledTile } from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "../Shared/CoinImage";

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin) {
  return topSection
    ? () => {
        removeCoin(coinKey);
      }
    : () => {
        addCoin(coinKey);
      };
}

export default ({ topSection, coinKey }) => {
  return (
    <AppContext.Consumer>
      {({ coinsList, addCoin, removeCoin, isInFavorites }) => {
        let coin = coinsList[coinKey];

        let TileClass = SelectableTile;
        if (topSection) TileClass = DeletableTile;
        else if (isInFavorites(coinKey)) {
          TileClass = DisabledTile;
        }

        return (
          <TileClass
            onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
          >
            <CoinHeaderGrid
              topSection={topSection}
              name={coin.CoinName}
              symbol={coin.Symbol}
            />
            <CoinImage coin={coin} />
          </TileClass>
        );
      }}
    </AppContext.Consumer>
  );
};
