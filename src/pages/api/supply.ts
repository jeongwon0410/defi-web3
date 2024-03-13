import {
  aave_address,
  dai_address,
  eurs_address,
  link_address,
  pool_contract,
  usdc_address,
  usdt_address,
  wbtc_address,
  weth_address,
} from "./common";

export async function DAISupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(dai_address, tokenSupply, localStorage.getItem("account"), "0")
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

export async function USDTSupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(usdt_address, tokenSupply, localStorage.getItem("account"), "0")
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

export async function USDCSupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(usdc_address, tokenSupply, localStorage.getItem("account"), "0")
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

export async function WBTCSupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(wbtc_address, tokenSupply, localStorage.getItem("account"), "0")
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

export async function LINKSupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(link_address, tokenSupply, localStorage.getItem("account"), "0")
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

export async function AAVESupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(aave_address, tokenSupply, localStorage.getItem("account"), "0")
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

export async function EURSSupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(eurs_address, tokenSupply, localStorage.getItem("account"), "0")
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

export async function WETHSupply(tokenSupply: number) {
  await pool_contract.methods
    .supply(weth_address, tokenSupply, localStorage.getItem("account"), "0")
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
