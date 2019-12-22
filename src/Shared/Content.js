import React from "react";
import { AppContext } from "../App/AppProvider";

const Content = ({ children }) => {
  return (
    <AppContext.Consumer>
      {({ coinsList }) => {
        if (!coinsList) {
          return <div>Loading coins</div>;
        }

        return <div>{children}</div>;
      }}
    </AppContext.Consumer>
  );
};

export default Content;
