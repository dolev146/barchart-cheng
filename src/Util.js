/**
 * Utility package.
 * @module views/patients/pateinetDetails/stimRecomendation/scaler/Util
 */

/** Scale step. */
export const step = 0.5;

/** 27 pixels in 1 mm for large scale. */
export const MM_IN_PIXELS_LARGE_SCALE = 27;

/** 15 pixels in 1 mm for small scale. */
export const MM_IN_PIXELS_SMALL_SCALE = 15;

/** Scale height in pixel unit. */
export const scaleHeight = MM_IN_PIXELS_LARGE_SCALE * step;

/**
 * Get the scaler values based on min and max depth array values.
 * @method
 *
 * @param {array} siteDepthBoundaries - The site depth min and max values.
 *
 * @return Scale value array.
 */
export const getScaleValues = function (siteDepthBoundaries) {
  let scaleValues = [];
  if (siteDepthBoundaries && siteDepthBoundaries.length > 0) {
    const topDepthElement = siteDepthBoundaries[0];
    const bottomDepthElement = siteDepthBoundaries[1];
    for (let i = bottomDepthElement; i <= topDepthElement; i += step) {
      scaleValues.push(i.toFixed(1));
    }
  }
  return scaleValues;
};

/**
 * Get the height in px, based on depth array values.
 * @method
 *
 * @param {array} siteDepthArray - Depth array.
 * @param {number} unitHeight - 1mm height equals to two unitHeight.
 *
 * @return Scale height in pixel unit.
 */
export const getHeightBasedOnDepthArray = function (
  siteDepthArray,
  unitHeight
) {
  const MM_IN_PIXELS =
    (unitHeight && unitHeight * 2) || MM_IN_PIXELS_LARGE_SCALE;
  const sortedSiteDepthArray = [...siteDepthArray].sort((a, b) => b - a);
  return (
    (sortedSiteDepthArray[0] -
      sortedSiteDepthArray[sortedSiteDepthArray.length - 1]) *
    MM_IN_PIXELS
  );
};

/**
 * Get the height of the heat map and RMS charts based on scaler values
 * and siteDepthArray
 * @method
 *
 * @param {array} scaleValues    - Scaler array, unit in mm.
 * @param {array} siteDepthArray - Depth array.
 *
 * @return heat map and RMS top margin in pixel unit.
 */
export const getHeatmapRMSTopMargin = function (
  scaleValues,
  siteDepthArray,
  unitHeight
) {
  const MM_IN_PIXELS =
    (unitHeight && unitHeight * 2) || MM_IN_PIXELS_LARGE_SCALE;
  return (
    (scaleValues[scaleValues.length - 1] - siteDepthArray[0]) * MM_IN_PIXELS
  );
};
