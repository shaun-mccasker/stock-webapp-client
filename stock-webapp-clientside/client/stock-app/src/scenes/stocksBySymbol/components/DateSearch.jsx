import React, { useEffect } from "react";
import { addDays, subDays } from "date-fns";
import { Form, FormGroup } from "reactstrap";
import DatePicker from "react-datepicker";

import {
  canUserAccessElement,
  filterData,
} from "../../../services/GeneralHelper";
import { useAppContext } from "../../../services/contextLib";

const DateSearch = (
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  apiRowData,
  setQueryData
) => {
  const { isAuth } = useAppContext();

  useEffect(() => {
    //if data exists filter it by date and return the data to parent
    if (apiRowData.length > 0) {
      const someData = filterData(apiRowData, startDate, endDate);
      setQueryData(someData);
    }
  }, [apiRowData, startDate, endDate]);

  return (
    <FormGroup
      id="date-input-form"
      className="d-flex justify-content-center"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Form>
        <DatePicker
          onChangeRaw={(event) => event.preventDefault()}
          className={canUserAccessElement(isAuth)}
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          maxDate={subDays(endDate, 1)}
        />
      </Form>
      <span className="p-2"> TO </span>
      <Form>
        <DatePicker
          onChangeRaw={(event) => event.preventDefault()}
          className={canUserAccessElement(isAuth)}
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
          }}
          minDate={addDays(startDate, 1)}
        />
      </Form>
    </FormGroup>
  );
};

export default DateSearch;
