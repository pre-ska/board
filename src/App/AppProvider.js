import React from "react";

const cc = require("cryptocompare");

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  setPage = page => this.setState({ page });

  savedSettings = () => {
    let data = JSON.parse(localStorage.getItem("boardData"));
    if (!data) {
      return { page: "settings", firstVisit: true };
    }

    return {};
  };

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });

    localStorage.setItem(
      "boardData",
      JSON.stringify({
        test: "hello"
      })
    );
  };

  fetchCoins = async () => {
    let coinsList = (await cc.coinList()).Data;
    this.setState({ coinsList });
  };

  state = {
    page: "dashboard",
    ...this.savedSettings(),
    setPage: this.setPage,
    confirmFavorites: this.confirmFavorites
  };

  componentDidMount = () => {
    this.fetchCoins();
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
