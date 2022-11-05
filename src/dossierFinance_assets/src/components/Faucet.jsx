import React, { useState } from "react";
import {
  // dossierFinance,
  canisterId,
  createActor,
} from "../../../declarations/dossierFinance";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
  const initialMessage = "Claim 5000 DOSS Token to " + props.userPrincipal;
  const [isDisabled, setDisabled] = useState(false);
  const [messageText, setMessageText] = useState(initialMessage);

  async function handleClick(event) {
    setDisabled(true);

    //Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();

    // // Local Network
    // const result = await dossierFinance.payOut();

    setMessageText(result);
  }

  return (
    <div className="faucet">
      <h1 className="dossierFinance-heading">Faucet</h1>

      <h6>Get your free Dossier tokens here!</h6>
      <h6>{messageText} !</h6>

      <button
        disabled={isDisabled}
        className="trade-buttons btn"
        id="btn-payout"
        onClick={handleClick}
      >
        Get DOSS
      </button>
    </div>
  );
}

export default Faucet;
