import {
  aave_address,
  aave_contract,
  dai_address,
  dai_contract,
  eurs_address,
  eurs_contract,
  link_address,
  link_contract,
  pool_contract,
  usdc_address,
  usdc_contract,
  usdt_address,
  usdt_contract,
  wbtc_address,
  wbtc_contract,
  weth_address,
  weth_contract,
} from "./common";

export async function DAISupply(tokenSupply: string, account: string) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  console.log(result);
  await pool_contract.methods
    .supply(dai_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function USDTSupply(tokenSupply: string, account: string) {
  const decimals = await usdt_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .supply(usdt_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function USDCSupply(tokenSupply: string, account: string) {
  const decimals = await usdc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .supply(usdc_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function WBTCSupply(tokenSupply: string, account: string) {
  const decimals = await wbtc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .supply(wbtc_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function LINKSupply(tokenSupply: string, account: string) {
  const decimals = await link_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .supply(link_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function AAVESupply(tokenSupply: string, account: string) {
  const decimals = await aave_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .supply(aave_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function EURSSupply(tokenSupply: string, account: string) {
  const decimals = await eurs_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .supply(eurs_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function WETHSupply(tokenSupply: string, account: string) {
  const decimals = await weth_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .supply(weth_address, result, account, "0")
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}
