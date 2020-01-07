import React from "react";
import { AppContext } from "../App/AppProvider";

const WelcomeMessage = () => {
  const { firstVisit } = React.useContext(AppContext);

  return firstVisit ? (
    <div>Welcome to CryptoDash, please select your favorite coins to begin</div>
  ) : null;
};

export default WelcomeMessage;
