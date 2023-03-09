import React from "react";
import BarChart from "react-bar-chart";
import Star from "./Star";

const StarChart = (props) => {
  const { oneStar, twoStar, threeStar, fourStar, fiveStar } = props.props;
  const data = [
    { text: "⭐", value: oneStar },
    { text: "⭐⭐", value: twoStar },
    { text: "⭐⭐⭐", value: threeStar },
    { text: "⭐⭐⭐⭐", value: fourStar },
    { text: "⭐⭐⭐⭐⭐", value: fiveStar },
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

export default StarChart;
