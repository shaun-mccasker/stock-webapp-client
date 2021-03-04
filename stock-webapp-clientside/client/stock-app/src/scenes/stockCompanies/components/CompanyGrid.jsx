import React, { useState, useEffect } from "react";
//styling imports
import "ag-grid-community/dist/styles/ag-grid.css";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {
  formatDataToArray,
  formatColToColDefs,
} from "../../../services/GeneralHelper";
import { useAppContext } from "../../../services/contextLib";

const CompanyGrid = (queryData, history) => {
  const { companySelected, setCompanySelected } = useAppContext();
  const formattedData = formatDataToArray(queryData);
  const [gridApi, setGridApi] = useState([]);
  return (
    <div
      id={"company-table"}
      className="ag-theme-balham"
      style={{
        alignedGrids: [],
        width: "100%",
      }}
    >
      <AgGridReact
        // onModelUpdate to control column sizes and set grid api whenever data is filtered or screen resized** onGridReady failed to init column sizing
        onModelUpdated={(params) => {
          params.api.sizeColumnsToFit();
          setGridApi(params.api);
          window.addEventListener("resize", (event) => {
            setTimeout((event) => {
              params.api.sizeColumnsToFit();
            });
          });
        }}
        domLayout="autoHeight"
        rowSelection="single"
        defaultColDef={true}
        columnDefs={formatColToColDefs(formattedData)}
        rowData={formattedData}
        // Handle on grid click event - Want to return the value of the selected Row
        onCellClicked={(event) => {
          setCompanySelected(gridApi.getSelectedRows()[0].symbol);
        }}
        onCellDoubleClicked={(event) => {
          history.push("/stocks/symbol/" + companySelected);
        }}
        pagination={true}
        paginationPageSize={21}
      />
    </div>
  );
};

export default CompanyGrid;
