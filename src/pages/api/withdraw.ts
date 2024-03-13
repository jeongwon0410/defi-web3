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

export async function DAIWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(dai_address, tokenSupply, localStorage.getItem("account"))
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

export async function USDTWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(usdt_address, tokenSupply, localStorage.getItem("account"))
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

export async function USDCWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(usdc_address, tokenSupply, localStorage.getItem("account"))
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

export async function WBTCWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(wbtc_address, tokenSupply, localStorage.getItem("account"))
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

export async function LINKWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(link_address, tokenSupply, localStorage.getItem("account"))
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

export async function AAVEWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(aave_address, tokenSupply, localStorage.getItem("account"))
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

export async function EURSWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(eurs_address, tokenSupply, localStorage.getItem("account"))
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

export async function WETHWithdraw(tokenSupply: number) {
  await pool_contract.methods
    .withdraw(weth_address, tokenSupply, localStorage.getItem("account"))
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
