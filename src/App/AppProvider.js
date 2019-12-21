import React from "react";

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
  setPage = page => this.setState({ page });
  state = {
    page: "dashboard",
    setPage: this.setPage
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
