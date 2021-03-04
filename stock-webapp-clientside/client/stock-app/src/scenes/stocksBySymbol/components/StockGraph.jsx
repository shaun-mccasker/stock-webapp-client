import React, { useState, useEffect, useRef } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
// import DateSearch from "./dateSearch";
import Chart from "chart.js";
import { useAppContext } from "../../../services/contextLib";

import CollapsableDiv from "../../../components/reusableComponents/CollapsableDiv";
export default function StockGraph(queryData) {
  const { companySelected } = useAppContext();
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    //on data change update the graph
    if (chartInstance) {
      const xAxis = getXaxis(queryData);
      const data = getGraphData(queryData);
      updateGraph(chartInstance, data, xAxis);
    }
  }, [queryData]);

  useEffect(() => {
    //establish graph
    if (chartRef && chartRef.current) {
      const myChart = new Chart(
        chartRef.current,
        initChartConfig(companySelected)
      );
      setChartInstance(myChart);
    }
  }, [chartRef]);

  return <div>{CollapsableDiv(<canvas ref={chartRef} />)}</div>;
}

//gets the date from data and returns it as an array
function getXaxis(apiRowData) {
  const tempXAxisArray = [];
  apiRowData.map((elem) => {
    tempXAxisArray.push(elem.date);
  });
  tempXAxisArray.reverse();
  return tempXAxisArray;
}

//gets the close price from the data and returns it as an array
function getGraphData(apiRowData) {
  const tempDataArray = [];
  apiRowData.map((elem) => {
    tempDataArray.push(elem.close);
  });
  tempDataArray.reverse();
  return tempDataArray;
}

//updates and rerenders the graph
function updateGraph(chartInstance, newData, newLabel) {
  chartInstance.data.labels = newLabel;
  chartInstance.data.datasets[0].data = newData;
  chartInstance.update();
}

//creates a chart config template handles style of graph here
function initChartConfig(companySelected) {
  return {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: companySelected,
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  };
}
