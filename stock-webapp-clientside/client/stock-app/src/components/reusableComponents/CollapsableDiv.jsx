import React, { useState } from "react";
//styling imports
import "ag-grid-community/dist/styles/ag-grid.css";
import { Button, Collapse, Card, CardBody } from "reactstrap";
//myFunc imports

export default function CollapsableDiv(ItemToCollapse) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Button color="primary" onClick={toggle} style={{ marginBottom: "1rem" }}>
        View Graph
      </Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>{ItemToCollapse}</CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
