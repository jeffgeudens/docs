import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { hardhat, arbitrumSepolia } from "wagmi/chains";
import { Chain } from "wagmi";

export const botanix = {
  id: 3636,
  name: "Botanix Testnet",
  network: "botanix",
  nativeCurrency: {
    decimals: 18,
    name: "Bitcoin",
    symbol: "BTC",
  },
  rpcUrls: {
    public: { http: ["https://node.botanixlabs.dev"] },
    default: { http: ["https://node.botanixlabs.dev"] },
  },
  blockExplorers: {
    etherscan: { name: "3xpl", url: "https://3xpl.com/botanix" },
    default: { name: "3xpl", url: "https://3xpl.com/botanix" },
  },
  // contracts: {
  //   multicall3: {
  //     address: "0xca11bde05977b3631167028862be2a173976ca11",
  //     blockCreated: 11_907_934,
  //   },
  // },
} as const satisfies Chain;

const { chains, publicClient } = configureChains(
  [botanix, hardhat],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
