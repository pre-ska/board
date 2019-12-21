import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import { SelectableTile } from "../Shared/Tile";

const CoinsGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`;

export default () => {
  return (
    <AppContext.Consumer>
      {({ coinsList }) => (
        <CoinsGridStyled>
          {Object.keys(coinsList).map(coinKey => (
            <SelectableTile>{coinKey}</SelectableTile>
          ))}
        </CoinsGridStyled>
      )}
    </AppContext.Consumer>
  );
};
