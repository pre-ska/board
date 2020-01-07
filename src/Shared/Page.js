import React from "react";
import { AppContext } from "../App/AppProvider";

export default ({ name, children }) => {
  const { page } = React.useContext(AppContext);


        if (page !== name) return null;
        return <div>{children}</div>;


};
