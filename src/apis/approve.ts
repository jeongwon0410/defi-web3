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

export async function DAIAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await dai_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}

export async function USDTAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await usdt_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await usdt_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}

export async function USDCAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await usdc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await usdc_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}

export async function WBTCAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await wbtc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await wbtc_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}

export async function AAVEAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await aave_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await aave_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}

export async function LINKAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await link_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await link_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}

export async function EURSAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await eurs_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await eurs_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}

export async function WETHAprove(
  setApproveDisable: React.Dispatch<React.SetStateAction<boolean>>,
  setApproveFlag: React.Dispatch<React.SetStateAction<boolean>>,
  tokenSupply: string,
  account: string
) {
  const decimals = await weth_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await weth_contract.methods
    .approve(pool_address, result)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Approve", hash);
      setApproveDisable(true);
      setApproveFlag(true);
    })
    .on("error", (error: any) => {
      console.log("Approve Error", error);
      setApproveFlag(false);
    })
    .on("receipt", (receipt: any) => {
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
        setApproveFlag(false);
      } else {
        console.log("Transaction Failed");
        setApproveFlag(false);
      }
    });
}
