import React from "react";
import BarChart from "react-bar-chart";

//CHART FOR BOOKS READ BY PAGE LENGTH
const PageChart = (props) => {
  const { under100, under250, under500, under750, under1000, under1500 } =
    props.props;
  const data = [
    { text: "0 to 100 pgs", value: under100 },
    { text: "100 to 250 pgs", value: under250 },
    { text: "250 to 500 pgs", value: under500 },
    { text: "500 to 750 pgs", value: under750 },
    { text: "750 to 1000 pgs", value: under1000 },
    { text: "1000 to 1500 pgs", value: under1500 },
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

export default PageChart;
