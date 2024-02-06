// @ts-nocheck
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import VendingMachine from "./VendingMachine.sol/VendingMachine.json";
import { useContractRead, useAccount, useContractWrite } from "wagmi";
import { isAddress, formatUnits } from "viem";
import "./App.css";

const contractAddress = "0x83D8d2062c16304e197416eEB807da8710935Ebe";

const contract = {
  address: contractAddress,
  abi: VendingMachine.abi,
};

function App() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const {
    data: cupcakeBalance,
    isError,
    isLoading,
  } = useContractRead({
    ...contract,
    functionName: "getCupcakeBalanceFor",
    args: [address],
    watch: true,
  });
  const { data, isSuccess, write } = useContractWrite({
    ...contract,
    functionName: "giveCupcakeTo",
  });
  const [cupcakeRecipient, setCupcakeRecipient] = useState("");

  console.log("recipientAddress: ", cupcakeBalance);

  return (
    <div className="App">
      <h1>Free Cupcakes</h1>
      <h2>Web3</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ConnectButton />
      </div>
      <input
        type="text"
        value={cupcakeRecipient}
        onChange={(e) => setCupcakeRecipient(e.target.value)}
        placeholder="Enter valid ethereum address to send cupcake to"
      />
      <button
        disabled={!write || !isAddress(cupcakeRecipient)}
        onClick={() =>
          write({
            args: [cupcakeRecipient],
          })
        }
      >
        Cupcake Please!
      </button>
      <div>
        Cupcake Balance:{" "}
        {cupcakeBalance ? formatUnits(cupcakeBalance, "0") : "0"} ({address})
      </div>
    </div>
  );
}

export default App;
