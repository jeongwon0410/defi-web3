import { useSDK } from "@metamask/sdk-react";
import {
  aave_contract,
  dai_contract,
  eurs_contract,
  link_contract,
  pool_address,
  usdc_contract,
  usdt_contract,
  wbtc_contract,
  weth_contract,
} from "./common";
import { useState } from "react";

export async function DAIAprove(tokenSupply: number) {
  await dai_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}

export async function USDTAprove(tokenSupply: number) {
  await usdt_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}

export async function USDCAprove(tokenSupply: number) {
  await usdc_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}

export async function WBTCAprove(tokenSupply: number) {
  await wbtc_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}

export async function AAVEAprove(tokenSupply: number) {
  await aave_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}

export async function LINKAprove(tokenSupply: number) {
  await link_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}

export async function EURSAprove(tokenSupply: number) {
  await eurs_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}

export async function WETHAprove(tokenSupply: number) {
  await weth_contract.methods
    .approve(pool_address, tokenSupply)
    .send({ from: localStorage.getItem("account") })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else {
        console.log("Transaction Failed");
      }
    });
}
