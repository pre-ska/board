import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import PriceTile from "./PriceTile";

const PriceGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`;

export default () => {
  const { prices } = React.useContext(AppContext);

  return (
    <PriceGridStyled>
      {prices.map((price, index) => (
        <PriceTile key={index} price={price} index={index} />
      ))}
    </PriceGridStyled>
  );
};
