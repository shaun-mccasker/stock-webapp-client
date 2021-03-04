import React, { useState, useEffect } from "react";
//styling imports
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
//myFunc Imports
import { useHistory } from "react-router-dom";
import { fetchAll } from "../../../services/AccessApi";
import CompanyGrid from "./CompanyGrid";
import Search from "./Search";
//

export default function StockCompanyBody() {
  //variabbles
  const history = useHistory();
  const defaultIndustry = "All Industries";
  //useStates
  const [apiRowData, setApiRowData] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [dropdownInput, setDropdownInput] = useState(defaultIndustry);
  const [textSearchInput, setTextSearchInput] = useState("");

  useEffect(() => {
    fetchAll(setApiRowData);
  }, []);

  return (
    <div>
      {/* display Search bars and title font - all content above the table */}
      {Search(
        apiRowData,
        textSearchInput,
        setTextSearchInput,
        dropdownInput,
        setDropdownInput,
        defaultIndustry,
        setQueryData
      )}
      {/* Grid with custom filter but it takes to many paramters annd makes me sad */}
      {CompanyGrid(queryData, history)}
    </div>
  );
}

//populate dropdown menu

//custom filter
