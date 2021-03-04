import React from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
//myFunc imports
import {
  formatDataToArray,
  formatColToColDefs,
} from "../../../services/GeneralHelper";

const StockTable = (queryData) => {
  const formattedData = formatDataToArray(queryData);
  return (
    <div
      id={"stock-grid"}
      className="ag-theme-balham"
      style={{
        alignedGrids: [],
        width: "100%",
      }}
    >
      <AgGridReact
        onModelUpdated={(params) => {
          var columnIds = [];
          params.columnApi.getAllColumns().forEach(function (column) {
            columnIds.push(column.colId);
          });
          params.columnApi.autoSizeColumns(columnIds);
          params.api.sizeColumnsToFit();
          window.addEventListener("resize", (event) => {
            setTimeout((event) => {
              params.columnApi.autoSizeColumns(columnIds);
              params.api.sizeColumnsToFit();
            });
          });
        }}
        domLayout="autoHeight"
        rowSelection="single"
        columnDefs={formatColToColDefs(formattedData)}
        rowData={formattedData}
        pagination={true}
        paginationPageSize={15}
      />
    </div>
  );
};

export default StockTable;

// return (
//     <div>
//       {/* Search by Date element */}
//       <FormGroup
//         id="date-search-form"
//         className="d-flex row justify-content-center"
//       >
//         {DateSearch(startDate, setStartDate, earliestDate, endDate, isAuth)}
//         <span className="p-2"> To </span>
//         {DateSearch(endDate, setEndDate, startDate, latestDate, isAuth)}
//       </FormGroup>
//       {/* {display graph toggle} */}
//       {displayButton(isAuth, apiRowData, startDate, endDate)}
//       {/* Display message to login in no authed */}
//       {displayMessage(isAuth)}
//       {/* display grid containing stock information*/}
//       {CreateGridBasic("stock-graph-grid", apiRowData)}
//     </div>
//   );
//filter data

//createGrid

//helpers

// function displayButton(isAuth, apiRowData, startDate, endDate) {
//   if (isAuth) {
//     return CollapsableDiv(StockGraph(apiRowData, startDate, endDate));
//   }
// }
