import React from "react";
import { AppContext } from "../App/AppProvider";

const Content = ({ children }) => {
  const { coinList, prices, firstVisit } = React.useContext(AppContext);


        if (!coinList) {
          return <div>Loading coins</div>;
        }
        if (!firstVisit && !prices) {
          return <div>Loading coins</div>;
        }

        return <div>{children}</div>;

};

export default Content;
