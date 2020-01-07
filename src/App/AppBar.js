import React from "react";
import styled, { css } from "styled-components";
import { AppContext } from "./AppProvider";

const Logo = styled.div`
  font-size: 1.3em;
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
    `}
  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

const toProperCase = text => {
  return text.charAt(0).toUpperCase() + text.substring(1);
};

const ControlButton = ({ name }) => {
  const { firstVisit, page, setPage } = React.useContext(AppContext);

  return (
    <ControlButtonElem
      onClick={() => setPage(name)}
      active={page === name}
      hidden={firstVisit && name === "dashboard"}
    >
      {toProperCase(name)}
    </ControlButtonElem>
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
