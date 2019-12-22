import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Styles";
import { AppContext } from "../App/AppProvider";
import _ from "lodash";
import fuzzy from "fuzzy";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px  solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

const handleFilter = _.debounce((inputValue, setFilteredCoins, coinsList) => {
  //get all the coins symbols
  let coinSymbols = Object.keys(coinsList);
  //get all the coins names, map symbol to name
  let coinNames = coinSymbols.map(sym => coinsList[sym].CoinName);
  let allStringsToSearch = coinSymbols.concat(coinNames);

  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string);

  let filteredCoins = _.pickBy(coinsList, (result, symKey) => {
    let coinName = result.CoinName;
    return (
      _.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName)
    );
  });

  setFilteredCoins(filteredCoins);
}, 500);

const filterCoins = (e, setFilteredCoins, coinsList) => {
  let inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, setFilteredCoins, coinsList);
};

const Search = () => {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinsList }) => (
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput
            onKeyUp={e => filterCoins(e, setFilteredCoins, coinsList)}
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
};

export default Search;
