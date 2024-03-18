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

export async function DAIBorrow(tokenSupply: string, account: string) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(dai_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function USDTBorrow(tokenSupply: string, account: string) {
  const decimals = await usdt_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(usdt_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function USDCBorrow(tokenSupply: string, account: string) {
  const decimals = await usdc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(usdc_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function WBTCBorrow(tokenSupply: string, account: string) {
  const decimals = await wbtc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(wbtc_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function LINKBorrow(tokenSupply: string, account: string) {
  const decimals = await link_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(link_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function AAVEBorrow(tokenSupply: string, account: string) {
  const decimals = await aave_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(aave_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function EURSBorrow(tokenSupply: string, account: string) {
  const decimals = await eurs_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(eurs_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}

export async function WETHBorrow(tokenSupply: string, account: string) {
  const decimals = await weth_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .borrow(weth_address, parseInt(result.toString()), 2, "0", account)
    .send({ from: account })
    .on("transactionHash", (hash: any) => {
      console.log("TX Hash Borrow", hash);
    })
    .on("error", (error: any) => {
      console.log("Supply Error", error);
    })
    .on("receipt", (receipt: any) => {
      console.log("Mined", receipt);
      if (receipt.status == "0x1" || receipt.status == 1) {
        console.log("Transaction Success");
      } else console.log("Transaction Failed");
    });
}
