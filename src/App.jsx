import React, { useState } from "react";
import AOBarChart from "./AOBarChart";

const App = () => {
  const electrode_list = [
    {
      value: "1",
      position: 1,
    },
    {
      value: "2",
      position: 2,
    },
    {
      value: "3",
      position: 3,
    },
  ];

  const [max, setMax] = useState(1);
  const [min, setMin] = useState(0);
  const [heatmapRMSHeight, setHeatmapRMSHeight] = useState(100);
  const [parm, setParm] = useState({
    max_nrms: 1,
  });

  const handleDeleteFn = () => {
    console.log("handleDeleteFn");
  };

  const [hg, setHg] = useState({
    electrode: electrode_list[0]?.value, // selected electrode
    position: electrode_list[0]?.position, // selected electrode position
    embeddedPosition: null, // position of embedded lead
    embeddedDepth: null, // depth of embedded lead
    electrode_list,
    electrodeStimSelectedKey: null,
    leadStimSelectedContacts: "",
    // newPatientData,
    // streaming data of current electrode
    siteData: {},
    editingMerDepth: null,
  });

  const rmsPsdChart = {
    siteDepthArray: hg.siteData.siteDepthArray || [
      0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8,
    ],
    rmsData: hg.siteData.rmsData || [
      0.0001, 0.0002, 0.0003, 0.0004, 0.0005, 0.0006, 0.0007, 0.0008, 0.0009,
      0.001, 0.0011, 0.0012, 0.0013, 0.0014, 0.0015, 0.0016,
    ],
    marginTop: 0,
    psdData: [],
  };

  return (
    <>
      <div>App</div>
      <AOBarChart
        isAbleDeleteRms={false}
        siteDepthArray={rmsPsdChart.siteDepthArray}
        rmsData={rmsPsdChart.rmsData}
        direction="rtl"
        marginTop={rmsPsdChart.marginTop}
        height={heatmapRMSHeight}
        max={max}
        min={min}
        max_nrms={parm.max_nrms}
        handleDeleteFn={handleDeleteFn}
      />
    </>
  );
};

export default App;
