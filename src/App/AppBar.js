import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: grid;
  grid-template-columns: 100px auto 100px 100px;
`;

export default () => {
  return (
    <Bar>
      <div>CryptoBurza</div>
      <div />
      <div>Dashboard</div>
      <div>Settings</div>
    </Bar>
  );
};
