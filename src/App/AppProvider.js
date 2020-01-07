import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";

const cc = require("cryptocompare");
cc.setApiKey(
  "103712d22b3982c3dd25cf63b2424d10a9a8db803e32b494beb1fc2b01ac39fd"
);

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "NEO", "DOGE", "EOS"],
      timeInterval: "days",
      ...this.savedSettings(),
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect
    };
  }

  addCoin = key => {
    let favorites = [...this.state.favorites];
    console.log(key);
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites }, () => console.log(this.state.favorites));
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];

    this.setState({ favorites: _.pull(favorites, key) });
  };

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    console.log(coinList);
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;

    let prices = await this.prices();

    // console.log(prices);

    this.setState({ prices });
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();

    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          ticker.USD
        ])
      }
    ];
    // console.log(historical);
    this.setState({ historical });
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorite,
          ["USD"],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }

    return Promise.all(promises);
  };

  prices = async () => {
    let returnData = [];
    console.log(this.state.favorites);
    let cnt = this.state.favorites.length;

    for (let favorite of this.state.favorites) {
      try {
        let priceData = await cc.priceFull(favorite, "USD", {});
        console.log(favorite, priceData);
        if (priceData) returnData.push(priceData);
        cnt--;
        if (!cnt) return returnData;
      } catch (error) {
        console.warn("fetch price error: ", error);
        cnt--;
        if (!cnt) return returnData;
      }
    }
    // const results = await Promise.all(returnData);

    // return results;
  };

  isInFavorites = key => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    // console.log(this.state.favorites);
    let currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );

    localStorage.setItem(
      "boardData",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  setCurrentFavorite = sym => {
    this.setState(
      { currentFavorite: sym, historical: null },
      this.fetchHistorical
    );

    localStorage.setItem(
      "boardData",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("boardData")),
        currentFavorite: sym
      })
    );
  };

  savedSettings = () => {
    let data = JSON.parse(localStorage.getItem("boardData"));
    if (!data) {
      return { page: "settings", firstVisit: true };
    }

    let { favorites, currentFavorite } = data;
    return { favorites, currentFavorite };
  };

  setPage = page => this.setState({ page });

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  changeChartSelect = value => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
