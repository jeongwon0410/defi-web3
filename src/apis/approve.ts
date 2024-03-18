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

export async function DAIAprove(tokenSupply: string, account: string) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await dai_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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

export async function USDTAprove(tokenSupply: string, account: string) {
  const decimals = await usdt_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await usdt_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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

export async function USDCAprove(tokenSupply: string, account: string) {
  const decimals = await usdc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await usdc_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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

export async function WBTCAprove(tokenSupply: string, account: string) {
  const decimals = await wbtc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await wbtc_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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

export async function AAVEAprove(tokenSupply: string, account: string) {
  const decimals = await aave_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await aave_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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

export async function LINKAprove(tokenSupply: string, account: string) {
  const decimals = await link_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await link_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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

export async function EURSAprove(tokenSupply: string, account: string) {
  const decimals = await eurs_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await eurs_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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

export async function WETHAprove(tokenSupply: string, account: string) {
  const decimals = await weth_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await weth_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
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
