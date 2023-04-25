/**
 * Y axis component package.
 * @module src/views/nt/YAxiss/YAxis
 */
import React from "react";
import "./YAxis.css";

export const calculateInterval = ({ max, min, spanHeight, step }) => {
  if (typeof min !== "number" || typeof max !== "number") {
    return {
      errMsg: "max or min should be number",
    };
  }
  const spanDepth = max - min;
  const scaleValues = [];
  for (let i = min; i <= max; i += step) {
    scaleValues.push(i.toFixed(1));
  }
  const stepHeight = parseFloat((spanHeight * step) / spanDepth);
  const perDepthHeight = parseFloat(spanHeight / spanDepth);
  const visibleScaleValues = calculateVisibleValues({
    scaleValues,
    stepHeight,
    step,
  });
  return {
    scaleValues,
    stepHeight,
    perDepthHeight,
    visibleScaleValues,
  };
};

const calculateVisibleValues = ({ scaleValues, stepHeight }) => {
  const scaleHeight = 27 * 0.5;
  if (stepHeight < scaleHeight) {
    const interval = Math.ceil(scaleHeight / stepHeight);
    const result = [];
    let startIndex = 0,
      lastIndex = scaleValues.length - 1;
    while (startIndex < lastIndex) {
      if (lastIndex - startIndex < interval) {
        result.push(scaleValues[startIndex]);
        break;
      } else {
        result.push(scaleValues[startIndex]);
        result.push(scaleValues[lastIndex]);
        startIndex += interval;
        lastIndex -= interval;
      }
    }
    return result;
  } else {
    return scaleValues;
  }
};

/**
 * Implementing the scale Y Axis, that uses the depth array
 * returned from back end to determine the axis boundaries.
 * @method
 *
 * @param {object} props - Gross properties.
 *
 * @return Y axis component.
 */
export const HgYAxis = (props) => {
  const direction = props.direction || "ltr";
  const max = props.max;
  const min = props.min;
  const spanHeight = props.height;
  const step = props.step || 0.5;
  const { errMsg, stepHeight, scaleValues, visibleScaleValues } =
    calculateInterval({ max, min, spanHeight, step });
  if (errMsg) {
    console.error(errMsg);
    return;
  }
  return (
    <div
      style={{ height: props.height + "px" }}
      className={
        "y-axis " + (direction === "rtl" ? "y-axis-right" : "y-axis-left")
      }
    >
      {scaleValues.reverse().map((value, index) => {
        return (
          <span
            className={
              "y-axis-element " +
              (direction === "rtl"
                ? "y-axis-element-right"
                : "y-axis-element-left")
            }
            key={index}
            style={{
              height: stepHeight,
              visibility: visibleScaleValues.includes(value) ? "" : "hidden",
            }}
          >
            {value}
          </span>
        );
      })}
    </div>
  );
};
export default HgYAxis;
