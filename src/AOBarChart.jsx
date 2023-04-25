/**
 * nRMS chart component package.
 * @module views/nt/AOBarChart/AOBarChart
 */
import React, { useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import NoDataAvailable from "./NoDataAvailable";
import ContextMenu from "./ContextMenu";
import { calculateInterval } from "./YAxis";
import * as Util from "./Util";

function SortDepthAndRms(siteDepthArray, rmsDataArray) {
  const siteArray = [];
  for (let idx = 0; idx != siteDepthArray.length; ++idx) {
    const depth = siteDepthArray[idx];
    const rms = rmsDataArray[idx];
    siteArray.push({ depth, rms });
  }
  siteArray.sort((x, y) => y.depth - x.depth);
  return {
    rmsDataArray: siteArray.map((item) => item.rms),
    siteDepthArray: siteArray.map((item) => item.depth),
  };
}

/**
 * Vertical nRMS chart component implementation.
 * @method
 *
 * @param {object} props - Gross properties.
 *
 * @return Vertical nRMS chart component.
 */
export const AOBarChart = (props) => {
  const contextMenuRef = useRef();
  if (!props.height) {
    return <NoDataAvailable />;
  }
  const { siteDepthArray, rmsDataArray } = SortDepthAndRms(
    props.siteDepthArray,
    props.rmsData
  );
  const unitHeight = props.unitHeight || Util.scaleHeight;
  const rmsHeight = Math.ceil(props.height);
  const max = props.max;
  const min = props.min;
  const max_nrms = props.max_nrms;
  const rmsData = [];
  const depthData = siteDepthArray.filter((item, index) => {
    if (item >= min && item <= max) {
      rmsData.push(rmsDataArray[index]);
      return item;
    }
  });
  const chartData = new Array(rmsHeight);
  const minBorder = props.useMinFromDepthData
    ? depthData[depthData.length - 1]
    : min;
  const { perDepthHeight } = calculateInterval({
    max,
    min,
    spanHeight: rmsHeight,
  });
  // Initialize the chart array.
  for (let i = 0; i <= rmsHeight; i++) {
    chartData[i] = { rms: 0 };
  }
  // Draw in each pixel in the Bar chart.
  // Get the RMS position from the PSD depth array 1-1, remaining
  // elements in chart array will have 0 value.
  for (let i = 0; i < depthData.length; i++) {
    chartData[
      Math.round(props.height - (depthData[i] - minBorder) * unitHeight * 2)
    ] = {
      rms: Math.min(rmsData[i], max_nrms),
      depth: depthData[i],
    };
  }
  let margin = { top: 0, right: 5, left: -50, bottom: -5 };
  if (props.direction === "rtl") {
    margin = { top: 0, right: -50, left: 5, bottom: -5 };
  }
  return (
    <>
      {props.height > 0 && chartData.length > 0 ? (
        <div
          ref={contextMenuRef}
          style={{
            marginTop: props.marginTop + 1,
            height: rmsHeight + 24,
            position: "relative",
          }}
        >
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical" margin={margin}>
              <XAxis
                type="number"
                reversed={props.direction === "rtl" ? true : false}
                style={{ fontSize: "0.7em" }}
                axisLine={{ stroke: "rgba(0, 0, 0, 0.12)" }}
                tickLine={{ stroke: "rgba(0, 0, 0, 0.12)" }}
                tick={{ fill: "#000000" }}
                domain={[0, max_nrms]}
              />
              <YAxis
                type="category"
                tick={false}
                orientation={props.direction === "rtl" ? "right" : "left"}
                axisLine={{ stroke: "rgba(0, 0, 0, 0.12)" }}
              />
              <Bar
                fill="#000000"
                dataKey="rms"
                barSize={1}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
          {props.isAbleDeleteRms && (
            <ContextMenu
              targetRef={contextMenuRef}
              data={chartData}
              handleDeleteFn={props.handleDeleteFn}
            />
          )}
        </div>
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};

export default AOBarChart;
