/**
 * No data indicator component component package.
 * @module widgets/noDataAvailable/NoDataAvailable
 */
import React from "react";
import "./NoDataAvailable.css";

/**
 * No data indicator component implementation.
 * @method
 *
 * @param {object} props - Not used.
 *
 * @return No data indicator component.
 */
function NoDataAvailable(props) {
  return (
    <div className="noDataAvailableContainer">
      <div className="noDataAvailable"></div>
      {props.message}
      <p className="description">{props.description}</p>
    </div>
  );
}

export default NoDataAvailable;
