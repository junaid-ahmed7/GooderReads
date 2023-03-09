import React from "react";
import BarChart from "react-bar-chart";

const PubChart = (props) => {
  const { twenty20s, twenty10s, thousands, nineties, old } = props.props;
  const data = [
    { text: "2020s", value: twenty20s },
    { text: "2010s", value: twenty10s },
    { text: "2000s", value: thousands },
    { text: "90s", value: nineties },
    { text: "Ancient", value: old },
  ];
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  return (
    <React.Fragment>
      <div style={{ width: "50%" }}>
        <BarChart
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

export default PubChart;
