import React, { useState, useEffect } from "react";
//styling imports
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
} from "reactstrap";
//myFunc Imports
import { getIndustryNames } from "../../../services/GeneralHelper";

const Search = (
  apiRowData,
  textSearchInput,
  setTextSearchInput,
  dropdownInput,
  setDropdownInput,
  defaultIndustry,
  setQueryData
) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  useEffect(() => {
    setQueryData(
      filterData(apiRowData, dropdownInput, textSearchInput, defaultIndustry)
    );
  }, [apiRowData, textSearchInput, dropdownInput]);
  return (
    <FormGroup id="search-form" className="d-flex row justify-content-center">
      <Form
        id="input-form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <input
          id="textIndustryInput"
          name="industry"
          type="text"
          value={textSearchInput}
          placeholder="Search By Industry"
          onChange={function (event) {
            setDropdownInput(defaultIndustry);
            setTextSearchInput(event.target.value);
          }}
        />
      </Form>
      <span className="p-2"> OR </span>
      <Form id="dropdown-form">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>{dropdownInput}</DropdownToggle>
          <DropdownMenu down>
            {getDropdownItems(
              apiRowData,
              setDropdownInput,
              setTextSearchInput,
              defaultIndustry
            )}
          </DropdownMenu>
        </Dropdown>
      </Form>
    </FormGroup>
  );
};

export default Search;

//helpers unqiue to this scene
function getDropdownItems(
  apiRowData,
  setstate,
  setOtherSearchState,
  defaultIndustry
) {
  const columnNames = getIndustryNames(apiRowData);
  const dropdownItem = [];
  dropdownItem.push(
    <DropdownItem
      onClick={(event) => {
        setOtherSearchState("");
        setstate(defaultIndustry);
      }}
    >
      {defaultIndustry}
    </DropdownItem>
  );
  columnNames.map((element) => {
    dropdownItem.push(
      <DropdownItem
        color="primary"
        onClick={function (event) {
          setOtherSearchState("");
          setstate(element);
        }}
      >
        {element}
      </DropdownItem>
    );
  });
  return dropdownItem;
}

function filterData(
  dataToFilter,
  searchValue,
  otherSearchValue,
  defaultSearchValue
) {
  var valueToQuery = "";
  if (searchValue !== defaultSearchValue && otherSearchValue === "") {
    valueToQuery = searchValue;
  } else if (searchValue === defaultSearchValue && otherSearchValue !== "") {
    valueToQuery = otherSearchValue;
  }
  const filteredData = dataToFilter.filter(function (company) {
    if (
      company.industry
        .toString()
        .toUpperCase()
        .includes(valueToQuery.toString().toUpperCase())
    ) {
      return company;
    }
  });
  return filteredData;
}
