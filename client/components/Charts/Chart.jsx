import BarChart from "react-bar-chart";
import React from "react";
import "../../../stylesheets/Chart.scss";

//CHART FOR BOOKS READ BY YEAR OF READING
const Chart = (props) => {
  const { twenty19, twenty20, twenty21, twenty22, twenty23 } = props.props;
  const data = [
    { text: 2019, value: twenty19 },
    { text: 2020, value: twenty20 },
    { text: 2021, value: twenty21 },
    { text: 2022, value: twenty22 },
    { text: 2023, value: twenty23 },
  ];
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  return (
    <React.Fragment>
      <div style={{ width: "50%" }}>
        <BarChart
          className="bar"
          ylabel="Books"
          width={1000}
          margin={margin}
          height={750}
          data={data}
        />
      </div>
    </React.Fragment>
  );
};

export default Chart;
