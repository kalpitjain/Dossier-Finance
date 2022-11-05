import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import {
  // dossierFinance,
  canisterId,
  createActor,
} from "../../../declarations/dossierFinance";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
  const [recipientId, setRecipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [messageText, setMessageText] = useState("");

  async function handleClick() {
    setDisabled(true);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);

    //Live Network
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.transfer(
      recipient,
      amountToTransfer
    );

    //Local Network
    // const result = await dossierFinance.transfer(recipient, amountToTransfer);

    setMessageText(result + " !");
    setAmount("");
    setRecipientId("");
    setDisabled(false);
  }

  return (
    <div className="transfer">
      <div className="row container-fluid">
        <h1 className="dossierFinance-heading">Transfer</h1>
        <div className="col col-xs-12 transfer-div">
          <h3>To Account</h3>
          <input
            type="text"
            id="transfer-to-id"
            spellCheck="false"
            value={recipientId}
            onChange={(e) => {
              setRecipientId(e.target.value);
            }}
          />
        </div>
        <div className="col col-lg-6 transfer-div">
          <h3>Amount</h3>
          <input
            type="number"
            id="amount"
            spellCheck="false"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>

        <p className="trade-buttons">
          <button
            className="btn"
            id="btn-transfer"
            disabled={isDisabled}
            onClick={handleClick}
          >
            Transfer
          </button>
        </p>
        <h6>{messageText}</h6>
      </div>
    </div>
  );
}

export default Transfer;
