import React from "react";
import {dtoken_backend, canisterId, createActor} from "../../../declarations/dtoken_backend";
import { AuthClient } from "@dfinity/auth-client";


function Faucet(props) {

  const [isDisabled, setDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState("Gimme gimme");

  async function handleClick(event) {
    event.preventDefault();
    setDisabled(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    console.log(identity);
    const authenticatedCanister = createActor(canisterId,{
      agentOptions:{
        identity, 
      },
    });
    const result = await authenticatedCanister.payOut();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DARiF tokens here! Claim 10,000 DANG coins to your account {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled} > 
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
