import React from "react";
import { Principal } from "@dfinity/principal";
import {dtoken_backend, canisterId, createActor} from "../../../declarations/dtoken_backend";
import { AuthClient } from "@dfinity/auth-client";
function Transfer() {

  const [benefeciaryId, setBenefeciaryId] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [result, setResult] = React.useState("");
  const [isDisabled, setDisabled] = React.useState(false);
  
  async function handleClick() {
    setDisabled(true);
    if(amount <= 0 || benefeciaryId === "") {
      setResult("Amount must be greater than 0");
      setDisabled(false);
      return;
    }
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
     const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity, 
      },
    });
    const transferAmount = Number(amount);
    const recieverID = Principal.fromText(benefeciaryId);
    const status = await authenticatedCanister.transfer(recieverID, transferAmount);
    setDisabled(false);
    setResult(status);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                placeholder="Enter a Principal ID"
                value={benefeciaryId}
                onChange={e => setBenefeciaryId(e.target.value)}

              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        {result && <p>{result}</p>} 
      </div>
    </div>
  );
}

export default Transfer;
