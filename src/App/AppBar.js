import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.5em;
`;

const Bar = styled.div`
  display: grid;
  grid-template-columns: 100px auto 100px 100px;
  margin-bottom: 40px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      color: #90b0ce;
      text-shadow: 0px 0px 20px #dbeeff;
      color: ;
    `}
`;

const toProperCase = text => {
  return text.charAt(0).toUpperCase() + text.substring(1);
};

const ControlButton = ({ name }) => {
  return (
    <AppContext.Consumer>
      {({ page, setPage }) => {
        console.log(page);
        console.log(setPage);
        return (
          <ControlButtonElem
            onClick={() => setPage(name)}
            active={page === name}
          >
            {toProperCase(name)}
          </ControlButtonElem>
        );
      }}
    </AppContext.Consumer>
  );
};

export default () => {
  return (
    <Bar>
      <Logo>CryptoBurza</Logo>
      <div />
      <ControlButton name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
};
