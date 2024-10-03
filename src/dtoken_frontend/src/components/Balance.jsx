import React from "react";
import { Principal } from "@dfinity/principal";
import {dtoken_backend} from "../../../declarations/dtoken_backend";

function Balance() {

  const [inputValue, setInputValue] = React.useState("");
  const [balanceResult, setBalanceResult] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  
  async function handleClick() {
    // console.log("Balance Button Clicked");
    setBalanceResult("");
    const principal = Principal.fromText(inputValue);
    const balance = await dtoken_backend.balanceOf(principal);
    const symbol = await dtoken_backend.getSymbol();
    setSymbol(symbol);
    setBalanceResult(balance.toLocaleString());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
      </p>  
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      {balanceResult !== "" && <p>This account has a balance of {balanceResult} {symbol}.</p>}
     
    </div>
  );
}

export default Balance;
