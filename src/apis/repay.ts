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

export async function DAIRepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(dai_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function USDCRepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await usdc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(usdc_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function USDTRepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await usdt_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(usdt_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function WBTCRepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await wbtc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(wbtc_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function LINKRepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await link_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(link_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function AAVERepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await aave_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(aave_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function EURSRepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await eurs_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(eurs_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function WETHRepay(
  setDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await weth_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .repay(weth_address, result, "2", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Supply", hash);
      setDisable(true);
      setFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Repay Error", error);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}
