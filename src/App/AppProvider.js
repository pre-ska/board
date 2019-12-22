import React from "react";
import _ from "lodash";

const cc = require("cryptocompare");

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
  setPage = page => this.setState({ page });

  savedSettings = () => {
    let data = JSON.parse(localStorage.getItem("boardData"));
    if (!data) {
      return { page: "settings", firstVisit: true };
    }

    let { favorites } = data;
    return { favorites };
  };

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });

    localStorage.setItem(
      "boardData",
      JSON.stringify({
        favorites: this.state.favorites
      })
    );
  };

  fetchCoins = async () => {
    let coinsList = (await cc.coinList()).Data;
    this.setState({ coinsList });
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];

    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];

    this.setState({ favorites: _.pull(favorites, key) });
  };

  isInFavorites = key => _.includes(this.state.favorites, key);

  state = {
    page: "dashboard",
    favorites: ["BTC", "ETH", "XMR", "DOGE"],
    ...this.savedSettings(),
    setPage: this.setPage,
    addCoin: this.addCoin,
    removeCoin: this.removeCoin,
    isInFavorites: this.isInFavorites,
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
