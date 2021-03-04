import React from "react";
import StockCompanyBody from "./components/StockCompanyBody";

export default function StockCompanies() {
  return (
    <main>
      <div>
        <h1 className="title__font">Company List</h1>
      </div>
      <div className="d-flex justify-content-center">
        <div className="adjustable-table">
          <StockCompanyBody />
        </div>
      </div>
    </main>
  );
}
