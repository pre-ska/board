import React from "react";
import "./App.css";
import WelcomeMessage from "./WelcomeMessage";
import AppLayout from "./AppLayout";

import AppBar from "./AppBar";

const App = () => {
  return (
    <AppLayout>
      <AppBar />
      <WelcomeMessage />
    </AppLayout>
  );
};

export default App;
