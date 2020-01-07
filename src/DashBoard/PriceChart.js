import HighchartsConfig from "./HighchartsConfig";
import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighCharts from "react-highcharts";
import HighchartsTheme from "./HighchartsTheme";
import ChartSelect from "./ChartSelect";

ReactHighCharts.Highcharts.setOptions(HighchartsTheme);

const PriceChart = () => {
  const { historical, changeChartSelect } = React.useContext(AppContext);

  return (
    <Tile>
      <ChartSelect
        default={"months"}
        onChange={e => changeChartSelect(e.target.value)}
      >
        <option value="days">Days</option>
        <option value="weeks">Weeks</option>
        <option value="months">Months</option>
      </ChartSelect>
      {historical ? (
        <ReactHighCharts config={HighchartsConfig(historical)} />
      ) : (
        <div>Loading historical data...</div>
      )}
    </Tile>
  );
};

export default PriceChart;
