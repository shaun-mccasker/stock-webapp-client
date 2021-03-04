import React from "react";
import StocksBySymbolBody from "./components/StocksBySymbolBody";
import { useAppContext } from "../../services/contextLib";

export default function StocksBySymbol() {
  const { companySelected } = useAppContext();
  return (
    <main>
      <div>
        <h1 className="title__font">{companySelected} stocks</h1>
      </div>
      <StocksBySymbolBody />
    </main>
  );
}
