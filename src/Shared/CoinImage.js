import React from "react";
import styled, { css } from "styled-components";

const CoinImage = styled.img`
  height: 50px;
  ${props =>
    props.spotlight &&
    css`
      height: 200px;
      display: block;
      margin: auto;
    `}
`;

export default ({ coin, spotlight }) => {
  return (
    <CoinImage
      spotlight={spotlight}
      src={`https://cryptocompare.com${coin.ImageUrl}`}
      // style={style || { height: "50px" }}
      alt={coin.CoinSymbol}
    />
  );
};
