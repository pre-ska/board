import React from "react";

export default ({ coin, style }) => {
  return (
    <img
      src={`https://cryptocompare.com${coin.ImageUrl}`}
      style={style || { height: "50px" }}
      alt={coin.CoinSymbol}
    />
  );
};
