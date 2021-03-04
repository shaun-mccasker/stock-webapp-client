import React from "react";

// if errorreturn an error message to page
export function displayError(errorMessage) {
  if (errorMessage !== "") {
    return (
      <div className="d-flex justify-content-center">
        <p>{errorMessage}</p>
      </div>
    );
  }
}

// get unique value from col Industry from data object array
export function getIndustryNames(rowData) {
  const unique = [...new Set(rowData.map((data) => data.industry))];
  return unique;
}

//get data and return it as array || aggird only takes arrays as its data
export function formatDataToArray(dataToFormat) {
  const formattedData = [];
  if (Array.isArray(dataToFormat)) {
    return dataToFormat;
  } else {
    formattedData.push(dataToFormat);
  }
  return formattedData;
}

// input data, read coltitles of each column, return them in a colDef format for us in aggrid
export function formatColToColDefs(dataToFormat) {
  const formattedCols = {
    columns: [],
  };
  var results = dataToFormat;
  if (results.length > 0) {
    for (var key in results[0]) {
      formattedCols["columns"].push({
        headerName: key,
        field: key,
        sortable: true,
        skipHeaderOnAutoSize: true,
        resizable: true,
      });
    }
  }
  return formattedCols.columns;
}

//pass into classname to disable element if user is not authed
export function canUserAccessElement(isAuth) {
  if (!isAuth) {
    return "disabled";
  }
}

//filter data between 2 values
export function filterData(dataToFilter, startDate, endDate) {
  startDate = startDate.toJSON();
  endDate = endDate.toJSON();
  const formattedEndDate = endDate.substr(0, endDate.indexOf("T"));
  const formattedStartDate = startDate.substr(0, startDate.indexOf("T"));
  const filteredData = dataToFilter.filter(function (stock) {
    if (stock.date >= formattedStartDate && stock.date <= formattedEndDate) {
      return stock;
    } else {
    }
  });
  return filteredData;
}
