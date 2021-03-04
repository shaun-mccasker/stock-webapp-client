import React from "react";
import { Form, Label, Input } from "reactstrap";

const InputForm = (formType, labelText, value, setValue) => {
  return (
    <Form className="input-form" onSubmit={(event) => event.preventDefault()}>
      <Label> {labelText} </Label>
      <Input
        type={formType}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={labelText}
      />
    </Form>
  );
};

export default InputForm;
