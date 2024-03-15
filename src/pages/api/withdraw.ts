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

export async function DAIWithdraw(tokenSupply: string) {
  const decimals = await dai_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .withdraw(
      dai_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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

export async function USDTWithdraw(tokenSupply: string) {
  const decimals = await usdt_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .withdraw(
      usdt_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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

export async function USDCWithdraw(tokenSupply: string) {
  const decimals = await usdc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);

  await pool_contract.methods
    .withdraw(
      usdc_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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

export async function WBTCWithdraw(tokenSupply: string) {
  const decimals = await wbtc_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .withdraw(
      wbtc_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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

export async function LINKWithdraw(tokenSupply: string) {
  const decimals = await link_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .withdraw(
      link_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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

export async function AAVEWithdraw(tokenSupply: string) {
  const decimals = await aave_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .withdraw(
      aave_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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

export async function EURSWithdraw(tokenSupply: string) {
  const decimals = await eurs_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .withdraw(
      eurs_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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

export async function WETHWithdraw(tokenSupply: string) {
  const decimals = await weth_contract.methods.decimals().call();
  const result = parseFloat(tokenSupply) * 10 ** parseInt(decimals);
  await pool_contract.methods
    .withdraw(
      weth_address,
      parseInt(result.toString()),
      localStorage.getItem("account")
    )
    .send({ from: localStorage.getItem("account") })
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
