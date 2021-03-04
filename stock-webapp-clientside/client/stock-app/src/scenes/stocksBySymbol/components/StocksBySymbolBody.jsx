import React, { useState, useEffect } from "react";
import { addDays, subDays } from "date-fns";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../services/contextLib";
import {
  fetchAuthStockByDate,
  fetchSingleRecentStock,
} from "../../../services/AccessApi";
import DateSearch from "./DateSearch";
import StockGraph from "./StockGraph";
import StockTable from "./StockTable";

export default function StocksBySymbolBody() {
  //earliest date is fixed to prevent large loading times incase of date change,
  //if larger data pool is given better to query api with dates instead of "query client side" <- assesment requirement
  const earliestDate = new Date("2019-11-04");
  const latestDate = new Date(); //non fixed incase of update
  const [startDate, setStartDate] = useState(addDays(earliestDate, 1));
  const [endDate, setEndDate] = useState(subDays(latestDate, 1));
  const { isAuth, companySelected } = useAppContext();
  const [apiRowData, setApiRowData] = useState([]);
  const [queryData, setQueryData] = useState([]);

  useEffect(() => {
    if (isAuth) {
      fetchAuthStockByDate(
        setApiRowData,
        companySelected,
        earliestDate,
        latestDate
      );
    } else {
      fetchSingleRecentStock(setQueryData, companySelected);
    }
  }, []);

  return (
    <div>
      {DateSearch(
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        apiRowData,
        setQueryData
      )}
      <div className="d-flex justify-content-center">
        <div className="adjustable-table">
          {displayGraph(isAuth, queryData)}
          {StockTable(queryData)}
        </div>
      </div>
    </div>
  );
}

//return

function displayGraph(isAuth, dataToQuery) {
  if (!isAuth) {
    return (
      <p>
        <Link to="/log-in">Log In </Link>
        to access date selection and graph
      </p>
    );
  } else {
    return StockGraph(dataToQuery);
  }
}
