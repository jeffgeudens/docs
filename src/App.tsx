// @ts-nocheck
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useContractRead,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { isAddress, formatUnits } from "viem";
import { vendingMachineAbi } from "./generated";
import "./App.css";

// const contractAddress = "0x83D8d2062c16304e197416eEB807da8710935Ebe";

function App() {
  const [cupcakeRecipient, setCupcakeRecipient] = useState("");
  const [contractAddress, setContractAddress] = useState(null);
  const contract = {
    address: contractAddress,
    abi: vendingMachineAbi,
  };
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
  const { config, error } = usePrepareContractWrite({
    ...contract,
    functionName: "giveCupcakeTo",
    args: [cupcakeRecipient],
  });
  const { write } = useContractWrite(config);

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
        placeholder="Enter address to send cupcake to"
      />
      <input
        type="text"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="Enter contract address"
      />
      <button
        disabled={
          !write || !isAddress(cupcakeRecipient) || !isAddress(contractAddress)
        }
        onClick={() => write?.()}
      >
        Cupcake Please!
      </button>
      {isError && <div>Error: {error.message}</div>}
      <div>
        Cupcake Balance:{" "}
        {cupcakeBalance ? formatUnits(cupcakeBalance, "0") : "0"} ({address})
      </div>
    </div>
  );
}

export default App;
